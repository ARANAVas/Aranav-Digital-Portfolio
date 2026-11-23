# V18.0 Security & Core Audit

## Source-level results

- Parsed the complete HTML and resolved local image, video, script, stylesheet and document references.
- No inline scripts, inline event handlers or inline style attributes remain.
- No `innerHTML` / `outerHTML` sink, `eval`, `new Function`, `document.write` or `insertAdjacentHTML` use remains in the application script.
- No high-confidence private-key, GitHub token, AWS key or Slack-token patterns were detected in audited text source files. This is a source-pattern scan, not a guarantee that arbitrary secrets cannot exist in binary documents.
- New-tab links use `noopener noreferrer`.
- The only `localStorage` entry is the visitor's colour-theme preference.
- No forms, iframe embeds, database, login, API or analytics tracker is present.

## Browser policy

- The HTML meta Content Security Policy allows same-origin scripts, images and media; Google Fonts is allowlisted for styles and font files. Inline scripts and inline event handlers are blocked. Objects and frames are disabled, mixed content upgrades are requested, and the base URL is restricted.
- A separate Chromium policy test confirmed that inline scripts and inline event handlers are blocked.
- Meta-delivered CSP cannot enforce `frame-ancestors`. The full HTTP-header policy in `vercel.json` and `_headers` adds `frame-ancestors 'none'`, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy, HSTS and COOP.

## Hosting boundary — read before publishing

The project previously targeted GitHub Pages. GitHub Pages HTTPS enforcement can be enabled in repository Settings → Pages; see the [official GitHub HTTPS guide](https://docs.github.com/en/pages/getting-started-with-github-pages/securing-your-github-pages-site-with-https). The HTML meta policies work on GitHub Pages. The included `vercel.json` and `_headers` files are for hosts that support those formats; they do not set response headers on standard GitHub Pages branch publishing.

For full response headers, use Vercel's supported `vercel.json` response-header configuration ([Vercel documentation](https://vercel.com/docs/project-configuration/vercel-json)) or deploy on Netlify / Cloudflare Pages with `_headers`. After deployment, verify the actual document response headers in browser DevTools.

## Runtime QA

- 17 viewport sizes from 320px through 1920px: no page-level horizontal overflow, visible text clipping or mobile/tablet hero-card overlap detected.
- Dark/light theme switching and role headline rotation passed.
- Mobile menu opens and closes on section navigation.
- All four skill doors display their matching details; next-skill and Escape-close behavior passed.
- Touch-emulated door hinge motion opens and closes; reduced-motion keeps the still logo poster and allows detail controls to work.
- Contact dialog opens, Escape closes it, and keyboard focus returns to the opener.
- All seven page images loaded; the new WebM logo video decoded at 640×360.
- No browser console errors, page errors or failed requests in the embedded runtime test.

The Chromium sandbox blocked direct local-server/file navigation, so page interaction tests used an embedded document with the packaged HTML, CSS, JavaScript and assets. The CSP policy itself was separately exercised with inline-script and inline-handler blocking tests.

## Performance notes

The stylesheet is 173,293 bytes (about 34,109 bytes in a local gzip estimate); the main script is 26,881 bytes (about 8,817 bytes gzip-estimated), and the HTML is 28,182 bytes (about 7,744 bytes gzip-estimated). Hosting platforms may compress responses; these are local estimates, not measured production transfer sizes. The logo video remains adaptive: it is assigned only near the viewport, paused off-screen, and skipped for reduced-motion/data-saver/slow connections. Below-the-fold images remain lazy-loaded.

## Not claimed

- No physical Android/iOS handset testing.
- No Lighthouse score, field Core Web Vitals or real-user performance result.
- No external penetration test or host-level vulnerability scan.
- No GitHub 2FA/passkey or repository permission setting changed by this package.
- No static-site release can be guaranteed vulnerability-free.
