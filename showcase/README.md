# Open Sport homepage phone carousel screenshots

## What these images actually are
Five JPEG screenshots captured with Playwright Chromium from the real **fictional** Open Sport React application, at a 390 x 748 mobile viewport. They are stored under `/showcase/` and identified by `/showcase/manifest.json`. The version shown on the page corresponds to the **captured app build**, not necessarily the currently published app.

## Root cause of empty phones (6 November 2026)
The first carousel used cross-origin iframes to an application **branch preview** protected by Cloudflare Access. CI header diagnostics confirmed that the app preview redirects to Cloudflare Access login (HTTP 302) and the login page returns `Content-Security-Policy: frame-ancestors 'none'` and `X-Frame-Options: DENY`. Browsers correctly refuse to show that page inside the phone iframe.

The user requested screenshots in phone frames. The fix uses generated screenshots from the actual app build as local image assets. It does not weaken Cloudflare Access or anti-clickjacking protection.

## How to refresh after the app changes
1. Build the **fictional** public React app on an isolated, tested development branch. Ensure no real people, private records, authentication session or youth photo is shown.
2. Run `node apps/player-web/scripts/capture-showcase.mjs` after the app build and Chromium installation. For controlled editorial extraction, `OS_EMIT_SHOWCASE_BASE64=true` emits five JPEG files as base64 to CI logs (currently enabled only for the dedicated app showcase branch).
3. Copy the five resulting JPEG files to website `showcase/{home,fixtures,calendar,team,profile}.jpg`. This is a deliberate marketing asset refresh, without embedding live cross-origin pages.
4. Update `showcase/manifest.json` with the actual app version, 40-character commit ID, CI capture run and generation date.
5. Keep the small text features and visual screenshots in sync. Update the version badge `APP SCREENSHOTS · vX.Y.Z` and human-readable feature copy if needed.
6. Review the static site preview, run `node scripts/check-progress-pages.mjs`, and verify the actual Cloudflare preview on a phone before seeking production approval.

## Non-negotiable publication rule
The screenshot carousel must never be empty. Its content is public, locally served image files and must not depend on cloud authentication, cross-origin iframes, cookies, browser extensions or third-party services. The button to explore the interactive demo remains separate and prominent. Capture source metadata, safeguarding requirements and accurate version labels stay part of the release acceptance checklist.
