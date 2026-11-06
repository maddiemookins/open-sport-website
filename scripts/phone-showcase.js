/* Homepage carousel uses snapshots captured from the actual fictional app.
 * Screenshot bytes live on this website, so cross-origin Cloudflare Access or
 * iframe clickjacking protection cannot leave the phone screens empty.
 * This is illustrative only; full functionality lives behind Try the Demo.
 */
(function(){
 'use strict';
 const carousel=document.querySelector('[data-phone-showcase]');
 if(!carousel)return;
 const slides=Array.from(carousel.querySelectorAll('.showcase-slide'));
 const track=carousel.querySelector('.showcase-track');
 const dots=Array.from(carousel.querySelectorAll('[data-showcase-dot]'));
 const previous=carousel.querySelector('[data-showcase-prev]');
 const next=carousel.querySelector('[data-showcase-next]');
 if(!track||slides.length!==dots.length||!previous||!next)return;
 const prefersReducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)');
 let index=0;
 let hovering=false,focused=false,visible=false,swipeStartX=null,lastGesture=0;
 const show=(n,byUser=false)=>{
  index=(n+slides.length)%slides.length;
  track.style.transform='translateX(-'+(index*100)+'%)';
  slides.forEach((slide,i)=>slide.setAttribute('aria-hidden',String(i!==index)));
  dots.forEach((dot,i)=>dot.setAttribute('aria-pressed',String(i===index)));
  if(byUser)lastGesture=Date.now();
 };
 const paused=()=>prefersReducedMotion.matches||document.hidden||!visible||
  hovering||focused||Date.now()-lastGesture<18000;
 previous.addEventListener('click',()=>show(index-1,true));
 next.addEventListener('click',()=>show(index+1,true));
 dots.forEach((dot,i)=>dot.addEventListener('click',()=>show(i,true)));
 carousel.addEventListener('keydown',(event)=>{
  if(event.key==='ArrowLeft'){event.preventDefault();show(index-1,true);}
  if(event.key==='ArrowRight'){event.preventDefault();show(index+1,true);}
 });
 carousel.addEventListener('mouseenter',()=>{hovering=true;});
 carousel.addEventListener('mouseleave',()=>{hovering=false;});
 carousel.addEventListener('focusin',()=>{focused=true;});
 carousel.addEventListener('focusout',(event)=>{if(!carousel.contains(event.relatedTarget))focused=false;});
 carousel.addEventListener('pointerdown',(event)=>{
  if(event.pointerType==='mouse'||event.target.closest('button'))return;
  swipeStartX=event.clientX;
 },{passive:true});
 carousel.addEventListener('pointerup',(event)=>{
  if(swipeStartX===null)return;
  const delta=event.clientX-swipeStartX;swipeStartX=null;
  if(Math.abs(delta)>45)show(index+(delta<0?1:-1),true);
 },{passive:true});
 carousel.addEventListener('pointercancel',()=>{swipeStartX=null;});
 if('IntersectionObserver' in window){
  const observer=new IntersectionObserver(entries=>{visible=entries.some(entry=>entry.isIntersecting);},{threshold:.15});
  observer.observe(carousel);
 }else{visible=true;}
 show(0);
 window.setInterval(()=>{if(!paused())show(index+1);},7000);
})();
