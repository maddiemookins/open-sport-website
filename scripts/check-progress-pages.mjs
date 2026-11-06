import {readFileSync} from 'node:fs';
import assert from 'node:assert/strict';
const read=path=>readFileSync(new URL('../'+path,import.meta.url),'utf8');
const pages=['index.html','platform.html','charter.html','demo.html','progress.html','contact.html'];
const progress=read('progress.html'), contact=read('contact.html'), styles=read('styles.css');
for(const page of pages){
 const html=read(page);
 assert.match(html,/<main id="main">/,'landmark on '+page);
 assert.match(html,/href="progress.html"/,'progress navigation on '+page);
 assert.match(html,/href="contact.html"/,'contact navigation on '+page);
 assert.match(html,/<nav aria-label="Main navigation">/,'navigation on '+page);
}
assert.match(progress,/<time datetime="2026-11-06">/);
assert.match(progress,/Demo implemented/);
assert.match(progress,/TEST infrastructure/);
assert.match(progress,/Needs attention/);
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
