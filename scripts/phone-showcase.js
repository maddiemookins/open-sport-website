/* Homepage feature carousel. Genuine app screens load on demand from the
 * canonical app URL, rather than a separately maintained screenshot/mock app.
 * Auto-advancement pauses for reduced motion, interaction, and when offscreen.
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
 const loadSlide=(n)=>{
  const frame=slides[n]?.querySelector('iframe[data-src]');
  if(!frame||frame.getAttribute('src'))return;
  const raw=frame.getAttribute('data-src');
  try{
   const url=new URL(raw);
   if(url.origin!=='https://open-sport-app.pages.dev')return;
   if(!['home','fixtures','calendar','team','profile'].includes(url.searchParams.get('view')))return;
   frame.src=url.href;
  }catch{/* Never navigate to untrusted carousel content. */}
 };
 const show=(n,byUser=false)=>{
  index=(n+slides.length)%slides.length;
  track.style.transform='translateX(-'+(index*100)+'%)';
  slides.forEach((slide,i)=>slide.setAttribute('aria-hidden',String(i!==index)));
  dots.forEach((dot,i)=>dot.setAttribute('aria-pressed',String(i===index)));
  loadSlide(index);
  // Preloading the next phone keeps forward swipes responsive.
  loadSlide((index+1)%slides.length);
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
  const observer=new IntersectionObserver(entries=>{
   visible=entries.some(entry=>entry.isIntersecting);
   if(visible)loadSlide(index);
  },{threshold:.15});
  observer.observe(carousel);
 }else{visible=true;}
 show(0);
 window.setInterval(()=>{if(!paused())show(index+1);},7000);
})();
