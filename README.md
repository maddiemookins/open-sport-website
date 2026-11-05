# Open Sport website

Initial **Brand Concept 1** and largely static public website for Open Sport.

**Tagline:** Sport belongs to everyone.  
**Campaign line:** More playing. More belonging. More celebrating.

## Purpose
An accessible UK-first home for Open Sport's mission, its ambition of one million people participating in amateur sport weekly, project updates, signposting for clubs and opportunities to get involved.

## Preview
Open `index.html` locally in a browser. There is no package installation or build step.

## Design
- Deep forest green `#102b24`
- Lime green `#c7f464`
- Warm off-white `#f5f4ed`
- Strong typographic hierarchy and community-focused language
- Mobile-responsive layout

The design is a **proposal**, not a final brand identity. No partner sponsorship, domain or public launch is implied.

## Deployment
This is a static site that can be hosted via GitHub Pages, Cloudflare Pages or another static hosting provider. Configure the actual domain, accessibility checks, privacy information and approved contact mechanism before public launch. Never publish personal information or email addresses without authorisation.

## Repository boundaries
The website is separate from the future interactive player platform monorepo and from the Open Sport product-governance repository.

## Next steps
- Review visual identity, typography, logo and imagery.
- Decide domain and hosting.
- Add real progress updates and an approved contact address.
- Establish accessible privacy and safeguarding information before soliciting registrations.


## Evergreen interactive demo integration

The marketing website now includes a `#try-demo` section with an accessible, responsive `iframe` pointing at the **stable** player-demo URL:

- Embedded interactive app: `https://open-sport-app.pages.dev/`
- Prominent full-page link for phones and browsers that disallow framing.
- Visitors do not need a login to explore fictional clubs and fixtures.
- The website contains no copy of the app code, fixtures, or release notes. Updates to the canonical demo automatically appear inside the embedded website when the player release is promoted.
- Mobile visitors can use the full-page link to avoid nested scrolling.

The public player app uses a separate origin, which retains its own device-local demo selections. The website must never collect or handle the app's authentication credentials, tokens, or private data.

**Release policy:** publish the website integration once the site's domain/host and the player app's `Content-Security-Policy: frame-ancestors` / `X-Frame-Options` behaviour have been verified. If the player deployment disallows framing, use the visible full-page link and authorise the actual marketing-site origin specifically before enabling the iframe. Avoid broad `frame-ancestors *` allowances.

**Testing:** run `node scripts/check-demo-embed.mjs` with Node 20+ to validate stable URL, accessible iframe, fallback links and responsive markup. Review the iframe on desktop and mobile in a real browser. This static source check is separate from the player's Playwright acceptance suite.

**Approval boundary:** this feature branch is a website change for review, not a request to deploy the website or introduce external services. The public player-demo URL remains independently deployed and updated through its existing gated release process.
