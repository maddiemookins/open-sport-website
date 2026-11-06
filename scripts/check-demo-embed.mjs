import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const home=readFileSync(new URL('../index.html',import.meta.url),'utf8');
const html=readFileSync(new URL('../demo.html',import.meta.url),'utf8');
const css=readFileSync(new URL('../styles.css',import.meta.url),'utf8');
const canonical='https://open-sport-app.pages.dev/';
const embeds=[...html.matchAll(/<iframe\b[^>]*>/gi)];
assert.equal(embeds.length,1,'Website must provide one clear interactive demo embed');
const embed=embeds[0][0];
assert.ok(embed.includes('src="'+canonical+'"'),'Embed must target the stable canonical app deployment');
assert.ok(/title="[^"]{15,}"/.test(embed),'Demo iframe requires a descriptive accessible title');
assert.ok(embed.includes('loading="lazy"'),'Defer loading until the demo is near the viewport');
assert.ok(html.includes('class="section demo-showcase"'),'Demo showcase needs a dedicated entry point');
assert.ok(home.includes('href="demo.html"'),'Homepage must link to the dedicated demo page');
assert.ok((html.match(new RegExp(canonical.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'),'g'))??[]).length>=2,
 'Offer a direct URL if third-party iframe embedding is blocked');
assert.ok(/target="_blank" rel="noopener noreferrer"/.test(html),'Full-page demo link must avoid opener exposure');
assert.ok(css.includes('.demo-frame')&&css.includes('@media(max-width:600px)'),
 'Embedded demo needs mobile-responsive styling');
assert.ok(/Fictional/i.test(html),'Describe sample player data as fictional');
console.log('Static website and evergreen demo integration checks passed');
