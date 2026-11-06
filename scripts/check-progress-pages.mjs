import {readFileSync} from 'node:fs';
import assert from 'node:assert/strict';
const read=path=>readFileSync(new URL('../'+path,import.meta.url),'utf8');
const pages=['index.html','sports.html','sporting-bodies.html','platform.html','charter.html','demo.html','progress.html','contact.html','login.html'];
const progress=read('progress.html'), contact=read('contact.html'), styles=read('styles.css');
for(const page of pages){
 const html=read(page);
 assert.match(html,/<main id="main">/,'landmark on '+page);
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
assert.match(home,/class="hero-photograph"/);
assert.match(home,/src="https:\/\/images.unsplash.com\/photo-/);
assert.match(home,/alt="Women playing field hockey/);
assert.match(home,/Photography:/);
assert.match(home,/href="demo.html"/);
assert.doesNotMatch(home,/<iframe/,'Homepage stays short: interactive demo is on its own page.');
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
