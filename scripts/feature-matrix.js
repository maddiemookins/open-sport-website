/* Curated snapshot, reviewed 6 November 2026.
 * Open Sport: BUILT (real public access or no player subscription), DEMO
 * (interactive fictional data only), TESTING (isolated integration),
 * PLANNED (not currently shipped for real users).
 * Competitors: YES (documented), PRO (documented but paid plan),
 * UNKNOWN (not established by cited sources), NA (not applicable
 * to the Open Sport-specific principle).
 * Only explicit verified negatives should be coded NO.
 */
const MATRIX_ROWS=[["Getting started","Mobile-friendly player app","demo","yes","yes","yes"],["Getting started","Explore fictional app without an account","demo","unknown","unknown","unknown"],["Getting started","No Open Sport player subscription","built","na","na","na"],["Getting started","Use app with unreliable signal / offline demo","demo","unknown","unknown","unknown"],["Getting started","Guided interactive product tour","demo","unknown","unknown","unknown"],["Getting started","What’s New release history","demo","unknown","unknown","unknown"],["Clubs & people","Club and team setup","demo","yes","yes","yes"],["Clubs & people","Multiple teams per club","demo","yes","yes","yes"],["Clubs & people","Player profiles and photographs","demo","yes","yes","yes"],["Clubs & people","Club committee contacts and roles","planned","unknown","unknown","unknown"],["Clubs & people","Supporter / friend role","planned","unknown","yes","unknown"],["Clubs & people","Referee role","planned","unknown","unknown","unknown"],["Clubs & people","Secure persistent real player accounts","testing","yes","yes","yes"],["Clubs & people","Google / Apple sign-in","planned","unknown","unknown","unknown"],["Fixtures & attendance","Fixtures, training and events calendar","demo","yes","yes","yes"],["Fixtures & attendance","Player RSVP / availability","demo","yes","yes","yes"],["Fixtures & attendance","Fixture-specific squad selection","demo","yes","yes","unknown"],["Fixtures & attendance","Match teas attendance tracking","demo","unknown","unknown","unknown"],["Fixtures & attendance","Match teas cutoff / captain controls","demo","unknown","unknown","unknown"],["Fixtures & attendance","Opt-in dietary requirements for host","demo","unknown","unknown","unknown"],["Fixtures & attendance","Calendar export","demo","yes","unknown","unknown"],["Fixtures & attendance","Automatic reminders","planned","yes","yes","yes"],["Communications","Team chat / conversations","demo","yes","yes","yes"],["Communications","Real-time club messaging","planned","yes","yes","yes"],["Communications","Polls and group feedback","planned","yes","unknown","pro"],["Communications","Social share of team news","planned","yes","yes","yes"],["Matches & recognition","Match scores and results","demo","yes","yes","unknown"],["Matches & recognition","Goals, assists and player statistics","demo","yes","pro","unknown"],["Matches & recognition","Player of the Match voting","demo","yes","yes","unknown"],["Matches & recognition","Celebrate participation and improvement","planned","unknown","unknown","unknown"],["Matches & recognition","AI-assisted match reports","planned","unknown","unknown","unknown"],["Payments & rewards","Match fee tracking (without payment processing)","demo","yes","unknown","pro"],["Payments & rewards","Integrated payments for real clubs","planned","yes","yes","pro"],["Payments & rewards","Local sponsor and loyalty rewards","planned","unknown","unknown","unknown"],["Safety & governance","Parent/guardian-managed youth accounts","planned","yes","yes","yes"],["Safety & governance","Under-16 photo and messaging restrictions","planned","unknown","unknown","unknown"],["Safety & governance","Club insurance proof and renewal reminders","planned","unknown","unknown","unknown"],["Safety & governance","In-app AGM voting / democratic governance","planned","unknown","unknown","unknown"],["Safety & governance","Club feature toggles and permissions","planned","yes","yes","pro"],["Leagues & platform","Multi-sport foundation","testing","yes","yes","yes"],["Leagues & platform","League standings engine","testing","unknown","yes","unknown"],["Leagues & platform","League creation / promotion / relegation","planned","unknown","unknown","unknown"],["Leagues & platform","Open-source, community-owned code and governance","planned","unknown","unknown","unknown"]];
const MATRIX_SOURCES=[
 {name:'Spond: official App Store feature listing',url:'https://apps.apple.com/gb/app/spond/id755596884'},
 {name:'Spond Club: official overview',url:'https://help.spond.com/club/en/articles/185666-about-spond-club'},
 {name:'SportEasy: team features',url:'https://www.sporteasy.net/en/teams/features/'},
 {name:'SportEasy: App Store listing',url:'https://apps.apple.com/gb/app/sporteasy-team-management/id599931266'},
 {name:'Heja: main features',url:'https://help.heja.io/en/articles/2483013-heja-s-main-features'},
 {name:'Heja: Pro plan features',url:'https://help.heja.io/en/articles/4358964-team-pro-pro-max-features'}
];
(function(){
'use strict';
const table=document.getElementById('matrix-body');
const search=document.getElementById('matrix-search');
const category=document.getElementById('matrix-category');
const count=document.getElementById('matrix-count');
if(!table||!search||!category||!count)return;
const labels={
 built:['✓','Built','built'],
 demo:['✓','In demo','demo'],
 testing:['◌','In testing','testing'],
 planned:['◌','Coming','planned'],
 yes:['✓','Available','yes'],
 pro:['✓','Paid tier','paid'],
 no:['×','Not available','no'],
 unknown:['?','Not verified','unknown'],
 na:['—','Not applicable','unknown']
};
const categories=[...new Set(MATRIX_ROWS.map(row=>row[0]))];
for(const name of categories){const option=document.createElement('option');option.value=name;option.textContent=name;category.append(option);}
function mark(value){
 const [symbol,label,kind]=labels[value]||labels.unknown;
 const node=document.createElement('span');node.className='matrix-status matrix-'+kind;
 node.setAttribute('aria-label',label);node.title=label;
 const glyph=document.createElement('span');glyph.setAttribute('aria-hidden','true');glyph.textContent=symbol;node.append(glyph);
 const detail=document.createElement('span');detail.className='matrix-status-text';detail.textContent=label;node.append(detail);
 return node;
}
function render(){
 const q=search.value.trim().toLocaleLowerCase('en-GB');
 const active=category.value;
 const visible=MATRIX_ROWS.filter(row=>(!active||row[0]===active)&&(!q||row[1].toLocaleLowerCase('en-GB').includes(q)||row[0].toLocaleLowerCase('en-GB').includes(q)));
 const fragment=document.createDocumentFragment();let prior='';
 for(const item of visible){
  if(item[0]!==prior){
   const row=document.createElement('tr');row.className='matrix-group';
   const heading=document.createElement('th');heading.scope='rowgroup';heading.colSpan=5;heading.textContent=item[0];
   row.append(heading);fragment.append(row);prior=item[0];
  }
  const tr=document.createElement('tr');tr.className='matrix-feature';
  const name=document.createElement('th');name.scope='row';name.textContent=item[1];tr.append(name);
  for(const value of item.slice(2)){const cell=document.createElement('td');cell.append(mark(value));tr.append(cell);}
  fragment.append(tr);
 }
 table.replaceChildren(fragment);count.textContent=visible.length+' of '+MATRIX_ROWS.length+' features shown';
 if(!visible.length){const tr=document.createElement('tr');const td=document.createElement('td');td.colSpan=5;td.textContent='No features match this search.';tr.append(td);table.append(tr);}
}
search.addEventListener('input',render);category.addEventListener('change',render);render();
})();
