# Open Sport website

Static website for the proposed Open Sport Foundation. The homepage includes a founding-charter summary for consultation.

**Tagline:** Sport belongs to everyone.  
**Campaign line:** More playing. More belonging. More celebrating.

## Purpose
An accessible UK-first home for Open Sport's mission, its ambition of one million people participating in amateur sport weekly, project updates, signposting for clubs and opportunities to get involved.

## Preview
Open `index.html` locally in a browser. There is no package installation or build step.

## Design
- Bold purple `#6A0DAD`, pale lilac `#E7D9FF` and warm off-white `#F9F5F2`
- Strong typographic hierarchy and community-focused language
- Mobile-responsive layout

The design is a **proposal**, not a final brand identity. No partner sponsorship, domain or public launch is implied.

## Deployment
This is a static site that can be hosted via GitHub Pages, Cloudflare Pages or another static hosting provider. Configure the actual domain, accessibility checks, privacy information and approved contact mechanism before public launch. Never publish personal information or email addresses without authorisation.

## Repository boundaries
The website is separate from the future interactive player platform monorepo and from the Open Sport product-governance repository.

## Next steps
- Review visual identity, typography, logo and imagery.
- Review and approve the Cloudflare Pages launch for `opensportfoundation.org`.
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

## Cloudflare Pages launch plan

After launch approval, connect this website repository to its own Cloudflare Pages project. Use `main` as the production branch, framework preset None, no build command, and `.` as the output directory. Review branch preview settings before enabling automatic deployments. Keep the player app on its existing separate project.

In that Pages project, add `opensportfoundation.org` under Custom domains. Use the Cloudflare zone for the apex and let Pages configure the record. Check the active domain and HTTPS before announcing the site. Follow the [Cloudflare Pages custom domain guide](https://developers.cloudflare.com/pages/configuration/custom-domains/).

Before launch, verify that the canonical demo opens without login, shows only fictional data and works in the iframe from the foundation domain on mobile and desktop. Keep the direct demo link visible. If framing is blocked, review the demo deployment's response headers and allow the exact foundation origin before enabling the iframe publicly.
