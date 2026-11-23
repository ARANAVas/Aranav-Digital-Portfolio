# V19 QA Report

## Embedded Chromium runtime checks
The complete HTML, CSS, JavaScript and local assets were loaded into an embedded Chromium document because the execution environment blocks direct `file://` and local HTTP server navigation. Google Fonts were not fetched in this isolated preview; the browser used the defined local font fallbacks.

- 17 viewport widths from 320px to 1920px: no horizontal overflow and no detected text clipping.
- On mobile widths, hero portrait, note and approach card do not overlap. The approach card's overlap with the portrait on wide desktop is an intentional part of the composition.
- No page-level JavaScript errors in the embedded preview.
- All four skill doors opened, displayed their matching details, closed and reset their `aria-expanded` state.
- Contact dialog opened and closed; initial focus entered the name field.
- Empty contact form was rejected; valid name/email/message were accepted.
- Form generated a correctly addressed and encoded `mailto:` draft containing the message body.
- Theme toggle changed the theme.
- Rotating role headline advanced.
- Reduced-motion mode was detected and kept video source loading deferred.

## Static source/security checks
- HTML parsed, IDs are unique, one primary H1 exists.
- All local image, video, script, stylesheet, resume and favicon references exist.
- All fragment links resolve.
- CSS parsed without top-level syntax errors.
- JavaScript passes `node --check`.
- No inline scripts, inline event handlers or inline style attributes.
- External links opened in a new tab use `noopener noreferrer`.
- No `innerHTML`, `outerHTML`, `eval`, `new Function` or `document.write` in the application script.
- V19 CSS/JS cache rules and security response configuration exist.
- No high-confidence GitHub token, AWS key or private-key pattern found in the HTML/JS text scan.

## Contact form boundary
The contact composer is a client-side email-draft helper. It creates a `mailto:` link for `aranavprime@gmail.com`. The visitor's email application opens with the message; the visitor must review and press Send. The portfolio does not transmit or store messages. It does not implement a server-side form endpoint, spam filtering or rate limiting.

## Remaining real-world checks
- Physical Android/iPhone tests.
- Live-host response-header verification.
- Lighthouse and field Core Web Vitals.
- External penetration testing.

The embedded Chromium checks and static scans are not a guarantee that every browser/device combination is bug-free.
