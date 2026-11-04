# Aranav Portfolio — V10 Device-Wide Performance Build

This is the V10 build. The white + crimson theme remains the first-visit default; the dark theme remains available from the theme toggle.

## Included
- Responsive portfolio source (`index.html`, `styles.css`, `script.js`)
- Four enhanced WebP photos and responsive image variants
- ATS-friendly PDF and editable DOCX resume
- Favicon, QA reports and GitHub Pages upload notes

## Performance work in this pass
- Explicit `display=swap` font loading
- Responsive hero image preload with high fetch priority
- Below-the-fold images use lazy loading, async decoding and low fetch priority
- Gallery `sizes` values match the rendered 48px/72px thumbnail widths
- Touch devices avoid sticky hover transforms
- Mobile ambient blur disabled to reduce GPU compositing work
- Keyboard skip-to-content link added
- Back-to-top visibility refreshes on viewport resize

## Deploy to GitHub Pages
1. Download and extract this ZIP.
2. Replace the repository's website files and the complete `assets` folder with the contents of `aranav-digital-portfolio`.
3. Commit to the existing `main` branch.
4. Wait for GitHub Pages to finish deploying, then hard-refresh the site.

See `UPLOAD-TO-GITHUB.txt` for the concise checklist.

## QA honesty
Static validation passed: JavaScript syntax, CSS top-level parsing, duplicate IDs, ARIA references and local asset paths. Runtime Chromium navigation could not be completed in this execution environment, so this package is not represented as physically tested on every device or browser. See `QA-REPORT.txt` for remaining checks.
