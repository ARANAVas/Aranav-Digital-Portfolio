# Aranav Sharma — Portfolio V20.2 | Signature Colour Edition

V20.2 builds directly on V20.1. The established portfolio layout and core interactions remain intact: cinematic logo video, rotating hero role line, four animated skill doors, capability card below the video, selected-work case notes, experience timeline, original portraits, résumé, theme switch and contact composer.

## What changed in V20.2

### Dark theme — Midnight Blue / Black
- Retains the cinematic dark experience and strengthens it with layered ink-black and midnight-blue surfaces.
- Uses soft blue accents for section details, buttons, focus states, borders and selected-work metadata.

### Light theme — Porcelain White / Oxblood Red
- Rebuilt the light theme around clean white surfaces, warm porcelain panels and a restrained deep-red accent.
- Improved hierarchy and contrast across the hero, skills, project cards, timeline, About, education and contact sections.
- Updated the header, modal, preloader, cards, tags and footer so light mode feels like a deliberate art direction rather than a reversed dark theme.

### Selected Work readability
- Strengthened project-card boundaries and shadows in both themes.
- Increased heading and paragraph clarity, refined metadata and made skill tags easier to scan.
- Refined the four work-preview visual panels and their labels for a more legible presentation.
- Case-study disclosures now use clear blue accents in dark mode and red accents in light mode.

### Footer signature
- Added a custom double-A monogram mark with theme-aware blue/red detailing, paired with the ARANAV SHARMA wordmark.

### Performance and maintenance
- Consolidated the four previously loaded CSS layers into one `portfolio-v22.css` stylesheet, reducing local stylesheet requests from four to one.
- Corrected malformed keyframe identifiers inherited from previous CSS layers.
- Shortened the decorative preloader fallback from 850 ms to 560 ms.
- Retained the hero video's viewport-aware loading, poster fallback, reduced-motion support and data-saver/slow-connection behavior.
- Retained lazy loading and responsive sources for below-the-fold portraits.

## Features intentionally preserved

- Signature animated logo video and original logo artwork.
- Rotating hero role copy.
- Four interactive skill doors and their detailed content.
- Hero capability card placed below the logo video (V20.1 fix).
- Both theme modes and stored theme preference.
- Selected work, experience timeline, story/About content, education and contact sections.
- Résumé download and client-side contact email draft to `aranavprime@gmail.com`.
- Privacy page, custom 404 page, sitemap, robots file and host configuration files.

## Deploy to GitHub Pages

1. Download and extract `Aranav-Digital-Portfolio-V20.2-Signature-Colour-Edition.zip`.
2. Open the existing repository `ARANAVas/Aranav-Digital-Portfolio`.
3. Replace the repository contents with the **contents** of the extracted folder. Do not upload the parent folder as a nested directory.
4. Keep the current GitHub Pages branch/folder configuration and commit the update.
5. After deployment, hard-refresh the portfolio and test the theme switch.

All pages now load `portfolio-v22.css` as the single local stylesheet. Do not mix the new `index.html` with previous CSS files or older index versions.

`vercel.json` and `_headers` are retained for compatible hosts. GitHub Pages does not apply those files as response headers. The meta CSP is not a substitute for verified HTTP response headers. See `SECURITY-DEPLOYMENT.md`.

## QA and honest limitations

- Static HTML, local asset references, CSS parsing and JavaScript syntax checks passed; see `V20.2-QA-REPORT.md`.
- Browser screenshots and interactive Chromium testing could not be completed in this build environment because browser navigation was blocked. Please check the rendered result on desktop and Android after deployment.
- This package has not been published to GitHub or another host.
- The contact composer opens a draft in the visitor's email application. It does not send or store submissions on a server.
- Physical-device testing, live-host security-header checks and Lighthouse/Core Web Vitals measurement remain outstanding.
