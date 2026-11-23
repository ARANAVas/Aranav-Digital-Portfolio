# Aranav Sharma — Digital Portfolio

**V21.2 · Core Craft Edition**

A responsive static personal portfolio for Aranav Sharma. This is a core refinement of the existing portfolio, not a replacement. It retains the signature logo video, rotating role line, selected work, experience, About, contact, résumé, privacy page, AA footer mark and four interactive Skills doors.

## Design system

- **Dark:** midnight navy and black, cool electric-blue highlights, layered surfaces and restrained borders.
- **Light:** porcelain white and warm blush surfaces, oxblood-red accents, dark charcoal typography and clear text contrast.
- **Typography:** Manrope for interface and display text; Cormorant Garamond for selected editorial emphasis.
- **Skills:** four stained-timber doors with raised inset panels, metal hinges, brass hardware, keyholes, a door edge and a lit portal.
- **Door interaction:** perspective swing from the left hinge; the selected detail panel opens after the swing and closes before the door returns. The transition-aware state machine supports keyboard controls, Escape, touch layouts and reduced-motion preferences.
- **Responsive layout:** four doors on wide desktop, two on tablet and most phones, one column below 350 px.
- **Navigation:** sticky header is opaque in both themes so page content never bleeds through it while scrolling.

## Important files

- `index.html` — main portfolio.
- `portfolio-core-v21.css` — consolidated stylesheet for all three pages.
- `script-v21.js` — interactions, skill-door state flow, theme toggle, contact dialog, reading progress and responsive navigation.
- `theme-init-v21.js` — applies the saved theme before the page is painted.
- `privacy.html` — privacy information.
- `404.html` — custom not-found page.
- `assets/` — original portfolio images, logo media and résumé files.
- `_headers` — security/caching rules for hosts that support this file format.
- `vercel.json` — Vercel security and caching configuration.
- `V21-QA-REPORT.md` / `.json` — static and browser-emulated QA summary.
- `V21-BROWSER-RUNTIME-RESULTS.json`, `V21-INTERACTION-RESULTS.json`, `V21-TOUCH-RESULTS.json` — detailed viewport and interaction evidence.
- `V21-PREVIEW-CHECKS.json` — measured theme, sticky-header and mobile layout checks.
- `V21-DEVICE-CHECKLIST.md` — tests to complete after deployment on actual devices.

## Local preview

From this folder, start any static file server, for example:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000/`. No build step or package installation is required. Google Fonts are optional; system fallbacks are included.

## Contact behaviour

The contact form validates the entered fields and creates a prefilled email draft addressed to `aranavprime@gmail.com` using the visitor's own email application. It does not store or transmit form submissions to a server.

## Motion and media

The animated logo video uses `preload="none"` and is activated near the viewport; reduced-motion, data-saver and slow-connection preferences skip video playback. Supporting photos use lazy loading and responsive `srcset` variants. The reading-progress element is a native `<progress>` element and does not require inline style mutations.

## Deployment

This is a source package. It has **not** been published to GitHub Pages. Extract the ZIP and upload the contents to the existing repository root; keep the `assets/` directory structure intact. See `UPLOAD-TO-GITHUB.txt`. GitHub Pages does not apply Vercel's `vercel.json` or Netlify-style `_headers` response rules. After publishing, complete the real-device checklist.
