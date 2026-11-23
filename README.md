# Aranav Sharma — Portfolio V20.1 | Hybrid Signature Edition

V20 builds on V19 rather than replacing the visual identity. The cinematic logo video, rotating capability headlines, four animated skill doors, dark/light theme, original portraits, experience timeline, résumé and contact dialog remain.

## What changed in V20

### V20.1 responsive hero correction

- The floating “Strategy × Craft” capability card is now a separate panel directly below the animated logo video, rather than sitting over the video/portrait.
- The separation is enforced at all viewport widths, including narrow phones, tablets, laptops and large desktop screens. The top-right “Strategy with intent” marker stays above the video.
- Existing V20 content, logo video assets, four skill doors, rotating headlines, themes and contact behavior are preserved.


- **Hybrid Signature art direction:** keeps the cinematic hero and signature motion, with more editorial spacing, typography, restrained material detail and clearer reading rhythm.
- **Hero message:** “Building brands. Creating connections.” with a practical, first-person supporting statement.
- **Case-study notes:** each existing selected-work card now opens an objective, contribution, approach and documented-output summary. No unverified reach, lead, revenue or learning metrics are invented. The paid-media card remains explicitly a planning concept, not a live-spend result.
- **Contact composer:** added an optional topic selector. The form still creates a local `mailto:` draft for `aranavprime@gmail.com`; it does not submit to or store data on a server.
- **Résumé:** the on-page actions now download the included PDF.
- **Privacy page:** describes the actual client-side form, local theme preference, external Google Fonts request and static hosting boundary. No analytics or ad tracking is added.
- **Custom 404 page:** included for static hosts such as GitHub Pages.
- **Search/social metadata:** refined title and descriptions, Open Graph locale/site name and image alt text. Canonical URL, sitemap and robots directives remain aligned to the existing GitHub Pages URL.
- **Accessibility refinements:** case-study disclosures use native `<details>` semantics; contact topic is a labeled native select; focus indicators and reduced-motion handling are retained.

## Deployment

Upload the **contents** of this folder to the repository root (do not upload the outer folder as a nested directory), commit, and let GitHub Pages build. Confirm the repository Pages source and enable **Enforce HTTPS** in repository Settings → Pages. The custom `404.html` is supported by GitHub Pages.

`vercel.json` and `_headers` are retained for compatible hosts. GitHub Pages does not apply those files as response headers. The CSP meta policy in `index.html` remains, but a meta CSP is not a replacement for verified HTTP response headers. See `SECURITY-DEPLOYMENT.md`.

## Honest limitations / launch checklist

- This package has not been published to GitHub or another host from this build session.
- This static contact composer does not receive or store submissions. A server-backed form requires a provider/endpoint, spam controls and an updated privacy notice.
- No testimonials or customer-performance metrics are included because approved quotes and verified measurement records were not supplied.
- No third-party analytics is enabled. Add privacy-respecting analytics only after selecting a provider and reviewing its consent and data handling requirements.
- Complete physical Android/iOS checks, live-host response-header checks and Lighthouse/Core Web Vitals measurement after deployment.
