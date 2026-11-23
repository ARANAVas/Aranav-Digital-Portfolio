# V21.2 Core Craft Edition — QA Report

**Source validation: PASS**  
**In-memory Chromium runtime checks: PASS for the cases listed below**

## Static source checks

- Parsed `index.html`, `privacy.html` and `404.html`: no duplicate IDs, missing local assets or broken internal fragment links.
- Consolidated CSS parser errors: **0**.
- `node --check` passed for `script-v21.js` and `theme-init-v21.js`.
- Exactly four skill doors are present. Their buttons have accessible names, initial `aria-expanded="false"`, matching `aria-controls` targets and a hidden detail panel on initial load.
- Door markup includes decorative insets, frames, hinges, edge, lever handle and keyhole.
- Door flow uses a bounded transition-aware state machine (`closed → opening → open → closing → closed`) with timeout fallback, focus management and Escape handling.
- No inline style attributes or inline event-handler attributes were found.
- Reading-progress updates use a native `<progress>` value; no inline style mutation is required. The source retains `style-src-attr 'none'`.
- Each HTML page has one local stylesheet. All current CSS/JS resource URLs use the `21.2` query version to avoid serving cached earlier resources.
- Both Manrope and Cormorant Garamond tokens are aligned with system fallbacks.

## Browser runtime and visual checks

The original HTML, CSS and JavaScript were loaded in a headless Chromium in-memory harness. Local assets were mapped to data URIs to avoid network restrictions.

| Test | Result |
|---|---|
| Emulated viewport widths | 19 widths: 320, 350, 360, 375, 390, 414, 430, 600, 760, 768, 820, 900, 1024, 1100, 1280, 1440, 1600, 1920, 2560 px |
| Horizontal overflow | None detected at tested widths |
| Hero video / capability card overlap | Zero intersection area at all tested widths |
| All four desktop skill doors | Each opened and fully closed; ARIA state returned to false |
| Touch-emulated skill door | Opened and fully closed after the full transition duration |
| Next skill / Escape | Passed |
| Reduced motion | Fresh context with reduced motion active before page load opened and closed the detail panel without a swing |
| Mobile menu | Open and close passed |
| Theme switch | Passed; dark/light values updated |
| Selected Work disclosure | Opened correctly |
| Contact dialog | Open and close passed |
| Browser console / page errors | None recorded |
| Missing local assets in harness | None |
| Sticky header opacity | Solid midnight `rgb(7, 13, 23)` dark; solid porcelain `rgb(255, 253, 252)` light, on desktop and mobile emulation |

## Contrast token checks

| Theme / pair | Contrast ratio | WCAG AA normal-text threshold |
|---|---:|---:|
| Dark primary text / background | 17.95:1 | 4.5:1 |
| Dark secondary text / background | 10.42:1 | 4.5:1 |
| Dark blue accent / background | 9.36:1 | 4.5:1 |
| Light primary text / white | 17.19:1 | 4.5:1 |
| Light secondary text / white | 8.92:1 | 4.5:1 |
| Light red accent / white | 7.33:1 | 4.5:1 |
| White button text / red button | 7.22:1 | 4.5:1 |

These figures are calculated for the listed colour pairs; they are not a claim that every rendered component has received a full WCAG audit.

## Performance snapshot

- One local stylesheet request per page; stylesheet is about 279 KB raw / 53.5 KB gzip.
- Main JavaScript is about 28.3 KB raw / 9.3 KB gzip.
- The hero video uses `preload="none"` and is activated near the viewport. Supporting photos use lazy loading and responsive `srcset` variants.
- Total local assets are about 1.19 MB, including the original résumé, optimized WebP images and logo media.

These are source-size and request-count observations, not Lighthouse or Core Web Vitals scores.

## What remains unverified

- Physical Android and iOS phones/tablets and real touch hardware.
- Safari, Firefox and other browser engines.
- Lighthouse, LCP, INP, CLS and field performance.
- Live-host response headers, production CSP delivery and GitHub Pages deployment.

The browser harness omitted external Google Font requests and removed the CSP meta element only inside the in-memory test page to allow source scripts/styles to be embedded; the source policy itself was checked statically. This does not prove the deployed server's HTTP headers or external font loading.

**No bug-free guarantee is possible.** These checks found no failures in the tested source and emulated browser cases, but real-device and production-host verification is still required.
