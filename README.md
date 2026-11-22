# Aranav Sharma — Portfolio V14

A responsive, editorial-style personal portfolio with a restrained quiet-luxury direction: deep charcoal, warm ivory, aged brass, refined serif/sans typography and purposeful motion. It is designed to feel personal and art-directed rather than like a generic AI template.

## V14 update included
- Dark luxury theme is the first-visit default; existing saved light/dark preferences are respected.
- Updated identity, hero copy, brand/content positioning and page metadata.
- Contact links, modal, copy-email action and script fallback use `aranavprime@gmail.com`.
- Cinematic hero logo film with a static WebP poster; video loads only when visible and is skipped for reduced-motion, data-saver and slow connections.
- V14 reading-progress hairline and subtle reveal polish.
- The original four interactive skill doors, door-entry transition, skill details, theme switch, navigation and resume link are retained.
- Existing resume files, photographs and original styles are retained.

## Main files
- `index.html` — V14 page markup, metadata and resource references.
- `styles.css` — original portfolio and skill-door design system.
- `script-v14.js` — primary site interactions, email update and dark-theme default.
- `script.js` — matching compatibility copy of the updated site script.
- `cinematic-v12.css/js` — editorial design and reduced-motion fallback.
- `cinematic-v13.css/js` — cinematic hero media and adaptive loading.
- `cinematic-v14.css/js` — final quiet-luxury polish, reading progress and reveal refinements.
- `assets/photos/` — original photography plus the new brand mark and cinematic logo media.

## Publish to GitHub Pages
1. Extract this ZIP.
2. Open your existing repository: `https://github.com/ARANAVas/Aranav-Digital-Portfolio`.
3. Upload the *contents* of the extracted `Aranav-Digital-Portfolio-main` folder to the repository root. Do not upload the wrapper folder as a nested directory.
4. Replace `index.html`, `script.js`, `styles.css` and the existing README/QA/upload notes with the included copies. Add the new `script-v14.js`, `cinematic-v12.*`, `cinematic-v13.*`, `cinematic-v14.*`, `robots.txt`, `sitemap.xml` and new brand media files.
5. Merge the included `assets/` folder with the existing one. Keep the resume PDF/DOCX, favicon and original photos; do not delete existing assets.
6. Commit to the branch configured in **Settings → Pages** (the existing setup is expected to use `main` / root).
7. Open `https://aranavas.github.io/Aranav-Digital-Portfolio/` and hard-refresh after GitHub Pages finishes deploying.

## Checks and limitations
Static source checks are listed in `QA-REPORT.txt` and `QA-REPORT.json`. No live GitHub write, browser-rendered test, real-device test, Lighthouse run or Core Web Vitals measurement was performed in this build. After publishing, test the site in Android Chrome and desktop browsers, including both themes, all four doors, contact/email actions, video poster and resume download.
