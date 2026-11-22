# Aranav Sharma — Premium Personal Portfolio (V16.2)

A refined editorial portfolio using charcoal, warm ivory, restrained brass accents and clear typography. This build replaces the hero logo animation with the new video supplied by the user and includes matching WebM and still-image fallbacks.

## Preserved features
- Animated signature-logo hero with adaptive lazy loading.
- Five rotating role headlines.
- Four interactive skill doors and detailed capability panels.
- Dark/light theme switch, mobile navigation and reduced-motion/data-saver support.
- Selected work, experience, About gallery, education, résumé and contact dialog.

## Files
- `index.html` — semantic page, SEO/social metadata and content.
- `portfolio-v15.css` — responsive visual system, dark/light themes and accessibility styling.
- `script.js` — role rotation, adaptive hero video, theme switch, mobile navigation, skill doors, contact dialog and copy-email action.
- `assets/` — résumé, favicon and image/video media.
- `V16.2-RUNTIME-QA.json` and `QA-REPORT.txt` — test records.

## Hero logo replacement
The user's uploaded `1000081650.mp4` replaces the previous hero logo animation under the site's existing asset name. A matching VP9 WebM fallback and a WebP poster were generated from the same clip. The clip is 640×360, 10 fps and 3 seconds long. Sampled frames showed no visible Gemini watermark, so cropping was not needed.

## Validation
The V16.2 package passed headless Chromium checks at 14 viewport widths from 320px to 1920px. There was no document-level horizontal overflow, no page or console errors, and the hero video, rotating headlines, theme switch, mobile navigation, a skill door and the contact dialog were tested. Reduced-motion mode retained the poster and avoided loading the video. Physical Android/iOS testing, hosted-font metrics and Lighthouse/Core Web Vitals remain outstanding. See `QA-REPORT.txt` for details.

## Publish
Upload the **contents** of this folder into the root of the existing GitHub repository:
`https://github.com/ARANAVas/Aranav-Digital-Portfolio`

Preserve the `assets/` and `assets/photos/` directory structure. In GitHub Pages choose branch `main` and folder `/(root)`. After committing, open the site in a private tab or hard-refresh to avoid cached prior media.


## V16.2 editorial and accessibility update
- Body type is DM Sans with Cormorant Garamond reserved for display accents.
- Rewrote visible portfolio copy in a direct first-person voice; kept the five rotating role headlines and all four skill areas.
- Kept the V16.1 replacement MP4/WebM logo and responsive still poster.
- Improved small-label and mobile paragraph sizing, including a tablet-width contact CTA fit.
- Contact dialog now returns focus to the exact button that opened it.
- The video remains lazy-loaded and is disabled for reduced-motion / data-saver / slow connections.
