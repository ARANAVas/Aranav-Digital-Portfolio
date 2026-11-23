# V20 QA Report

## Static/source validation

All 16 static checks passed: unique IDs, one primary H1, local resources, fragment targets, JavaScript syntax, CSS parsing, preservation of four skill doors and signature logo video, role rotation, theme control, four case-study disclosures, contact topic, contact privacy statement, résumé download, privacy page, custom 404 page, and absence of inline style attributes/event handlers. See `V20-STATIC-QA.json`.

## Embedded Chromium smoke test

- 14 viewport widths from 320 px to 1920 px: document and body scroll widths matched viewport width at each tested size.
- No console errors or uncaught JavaScript errors in the embedded test.
- All four skill doors opened their expected detail panels and reset `aria-expanded` when closed.
- All four case-study disclosures opened.
- Dark/light theme toggle worked.
- Contact dialog opened; empty required fields were rejected; a completed form generated a `mailto:` draft to `aranavprime@gmail.com` containing the selected topic and reply address.
- Mobile navigation opened.
- Rotating role labels advanced when motion was allowed.
- Hero video sources remained deferred when reduced motion was enabled.

See `V20-EMBEDDED-RUNTIME-QA.json` for the detailed scope. The preview was assembled as an embedded Chromium document because direct local HTTP navigation was blocked in the execution environment. Google Fonts and hero video playback were not tested in that embedded smoke test.

## Not claimed as complete

- This package has not been published to GitHub or another host in this build session.
- Live-host response headers have not been verified. GitHub Pages does not apply `vercel.json` or `_headers` as HTTP response headers.
- Physical Android/iOS checks and Lighthouse/Core Web Vitals measurements remain outstanding.
- No server-side contact submission, message storage, spam filtering or rate limiting is implemented.
- No testimonials or customer-performance numbers were added because verified, approved source material was not provided.

Static checks and embedded smoke tests do not guarantee that every browser/device combination is bug-free.
