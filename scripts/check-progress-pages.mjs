import {readFileSync} from 'node:fs';
import assert from 'node:assert/strict';
const read=path=>readFileSync(new URL('../'+path,import.meta.url),'utf8');
const pages=['index.html','sports.html','sporting-bodies.html','platform.html','charter.html','demo.html','progress.html','contact.html','login.html','features.html'];
const progress=read('progress.html'), contact=read('contact.html'), styles=read('styles.css');
for(const page of pages){
 const html=read(page);
 assert.match(html,/<main id="main">/,'landmark on '+page);
 assert.match(html,/href="features.html"/,"feature matrix navigation on "+page);
 assert.match(html,/href="progress.html"/,'progress navigation on '+page);
 assert.match(html,/href="contact.html"/,'contact navigation on '+page);
 assert.match(html,/href="login.html"/,'login navigation on '+page);
 assert.match(html,/href="sports.html"/,'sport navigation on '+page);
 assert.match(html,/href="sporting-bodies.html"/,'sporting-body navigation on '+page);
 assert.match(html,/<nav aria-label="Main navigation">/,'navigation on '+page);
}
assert.match(progress,/<time datetime="2026-11-06">/);
assert.match(progress,/Demo implemented/);
assert.match(progress,/TEST infrastructure/);
assert.match(progress,/CI passing/);
for(const text of ['Full Open Sport roadmap','Technology roadmap','OSF roadmap','to be defined'])assert.ok(progress.includes(text),text);
assert.match(progress,/<th scope="col">/);
assert.match(progress,/<th scope="row">/);
assert.match(progress,/Status is a curated snapshot/);
assert.doesNotMatch(contact,/<form\b/,'contact intentionally collects no data yet');
assert.doesNotMatch(contact,/input\s+type=["']email/,'contact must not collect emails yet');
assert.match(contact,/safeguarding escalation/);
assert.match(styles,/\.progress-table/);
assert.match(styles,/\.roadmap-columns/);
console.log('Website progress, contact, navigation and privacy checks passed.');

const home=read('index.html'),sports=read('sports.html'),bodies=read('sporting-bodies.html');
assert.match(home,/class="hero-phone-showcase"/,'Homepage prominently showcases genuine app screens in a phone');
assert.match(styles,/\.showcase-photo-backdrop/,'Photo-led hero retained as background');
assert.match(home,/class="showcase-phone"/,'Phone mockup frames genuine app screens');
assert.match(home,/Photography:/);
assert.match(home,/href="demo.html"/);
assert.match(home,/src="showcase\/fixtures.jpg"/,'Carousel renders a real app screenshot');
for(const sport of ['hockey','football','netball','rugby','basketball','cricket','volleyball']) {
 assert.match(sports,new RegExp('id="'+sport+'"'),'Sport directory includes '+sport);
}
for(const concept of ['promotion/relegation','forfeits','appeals','audit trail','travel']) {
 assert.ok(bodies.toLowerCase().includes(concept.toLowerCase()),concept);
}
console.log('Photo-led multisport and league navigation checks passed.');

const landing=read('index.html'),login=read('login.html'),terms=read('terms.html'),privacy=read('privacy.html');
assert.match(landing,/home-app-button/,'First page visibly launches the app');
assert.match(landing,/href="demo.html">🏑 OPEN THE APP DEMO/);
assert.match(landing,/COMING SOON ON THE/,'Apple Store marked coming soon');
assert.match(landing,/COMING SOON ON/,'Google Play marked coming soon');
assert.match(landing,/App Store/);assert.match(landing,/Google Play/);
assert.match(login,/https:\/\/open-sport-app.pages.dev\/\?view=account/,'Login routes to canonical app');
assert.match(login,/disabled aria-label="Continue with Google/,'Unconfigured Google sign-in is disabled');
assert.match(login,/href="terms.html"/);assert.match(login,/href="privacy.html"/);
assert.match(terms,/NOT IN EFFECT/);assert.match(privacy,/NOT IN EFFECT/);
assert.doesNotMatch(login,/<form\b/,'Website cannot intercept real login credentials');
console.log('App launch, store coming-soon and safe sign-in gateway checks passed');

const featureJs=read('scripts/phone-showcase.js');
const snapshotManifest=JSON.parse(read('showcase/manifest.json'));
assert.equal(snapshotManifest.version,'0.5.6','Snapshot manifest identifies tested source app version');
assert.match(snapshotManifest.source_commit,/^[a-f0-9]{40}$/,'Snapshots must be traceable to a real app build');
assert.equal(snapshotManifest.fictional_data_only,true,'Screenshots contain fictional test data only');
for(const view of ['home','fixtures','calendar','team','profile']){
 assert.match(home,new RegExp('data-app-view="'+view+'"'),'Feature carousel includes '+view);
 assert.match(home,new RegExp('src="showcase/'+view+'[.]jpg"'),'Carousel must show a local screenshot for '+view);
 const jpg=readFileSync(new URL('../showcase/'+view+'.jpg',import.meta.url));
 assert.ok(jpg.length>12000,'Screenshot must be nonempty: '+view);
 assert.equal(jpg[0],0xff,'JPEG magic first byte '+view);
 assert.equal(jpg[1],0xd8,'JPEG magic second byte '+view);
 assert.equal(jpg[jpg.length-2],0xff,'JPEG end marker first byte '+view);
 assert.equal(jpg[jpg.length-1],0xd9,'JPEG end marker last byte '+view);
}
assert.equal((home.match(/class="showcase-slide"/g)||[]).length,5,'Five feature slides');
assert.doesNotMatch(home,/<iframe/,'Homepage screenshot carousel must not depend on Cloudflare Access or cross-origin iframes');
assert.match(featureJs,/prefers-reduced-motion/,'Carousel respects motion preferences');
assert.match(featureJs,/document.hidden/,'Carousel stops in background tabs');
assert.match(featureJs,/focusin/,'Carousel pauses during keyboard interaction');
assert.match(featureJs,/mouseenter/,'Carousel pauses when hovered');
assert.match(featureJs,/pointerup/,'Mobile touch swipe works');
assert.match(featureJs,/new IntersectionObserver/,'Carousel avoids offscreen automatic animation');
assert.match(home,/data-showcase-version/,'Homepage identifies version of its local screenshots');
assert.match(home,/APP SCREENSHOTS · v0[.]5[.]6/,'Label screenshot version honestly');
assert.match(styles,/showcase-snapshot/,'CSS displays screenshot imagery within the phone');
console.log('Five genuine app screenshots, source traceability, swipe and accessibility checks passed');

const matrix=read('features.html'), matrixJs=read('scripts/feature-matrix.js');
assert.match(home,/Compare all 43 features/,'Home must promote feature comparison');
assert.match(progress,/View the feature comparison matrix/,'Progress page links directly to full matrix');
for(const competitor of ['Spond','SportEasy','Heja'])assert.ok(matrix.includes(competitor),'Comparator '+competitor+' named');
for(const key of ['matrix-search','matrix-category','matrix-body','matrix-count'])assert.ok(matrix.includes(key),'Feature matrix interactive control '+key);
assert.match(matrix,/In demo/,'Fictional demo states explained');
assert.match(matrix,/Not verified/,'Unconfirmed competitor statuses are not invented');
assert.match(matrix,/https:\/\/help.spond.com/,'Links to an official comparison source');
assert.match(matrix,/https:\/\/help.heja.io/,'Links to an official comparison source');
assert.match(matrixJs,/const MATRIX_ROWS=/,'Curated comparison row data retained');
assert.match(matrixJs,/labels=/,'Status legend mapping retained');
assert.match(matrixJs,/replaceChildren\(fragment\)/,'Feature filters populate accessible rows');
const featureRows=matrixJs.match(/\["(?:Getting started|Clubs & people|Fixtures & attendance|Communications|Matches & recognition|Payments & rewards|Safety & governance|Leagues & platform)"/g)||[];
assert.equal(featureRows.length,43,'All 43 feature rows present');
assert.match(styles,/\.matrix-table-wrap/,'Comparison table mobile style retained');
assert.match(styles,/position:sticky/,'Sticky headers on horizontally scrollable table');
console.log('Full 43-feature public comparison, navigation, sources and accessibility checks passed.');
