# Aranav — Digital Marketing & Applied AI Portfolio (V9 Recruiter-Ready)

A responsive, single-page professional portfolio with a premium white + crimson-red default and a cinematic midnight alternate. The skills section uses four arched 3D doors; opening one reveals a focused skill-detail view.

## Preview locally

Open `index.html` in a modern browser, or run:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## What changed in V9

- Replaced the two floating/overlapping mini portrait stickers with a balanced two-card portrait gallery beneath the main story image.
- Added a recessed portal behind each skill door, a visible reverse panel and a weighted 3D hinge swing. Front labels fade while the door turns, preventing mirrored text on the back.
- Synchronized the 3D door motion with the skill-detail reveal.
- Corrected the typeface mapping: Manrope for interface/body copy, Cormorant Garamond for editorial emphasis and DM Mono for metadata. Google Fonts use `display=swap` with system fallbacks.
- Added a direct `View resume` action in the hero for recruiter access.
- Rebuilt the resume in a single-column, text-first ATS-friendly PDF and editable DOCX.

## Main sections

- Hero with professional portrait, rotating specialisations, contact action and resume link
- Four interactive skill doors: Digital Marketing & Paid Media, SEO & Website, AI & Generative AI, and Data & Operations
- Selected work and practical examples
- Professional experience at EliteFinish, RICOZ Innovation and IT Hub Solution
- Personal story, separate professional portrait cards and current B.Sc. Physics education
- Contact dialog with email, LinkedIn and copy-email actions

## Theme options

- First-visit default: white surfaces, graphite typography and restrained crimson-red accents
- Alternate: cinematic midnight / dark theme
- Saved theme is applied in the document head before the first paint and persisted when browser storage is available

## Resume files

- `assets/Aranav-Resume.pdf` — one-page searchable PDF, single column, no photograph or sidebars
- `assets/Aranav-Resume-ATS.docx` — editable one-page Word version with the same text-first structure

## Performance and accessibility

- Plain HTML, CSS and JavaScript; no framework or animation libraries
- WebP photography; hero image preloaded with high fetch priority
- Below-the-fold images lazy-loaded and asynchronously decoded
- Image dimensions declared to reduce layout shift
- Reduced-motion support and system-font fallbacks
- Semantic sections, descriptive alt text, button-based skill controls and visible focus states
- Responsive layout and interaction checks completed in Chromium from 320px through 1440px in both themes

## Skills and AI positioning

AI/GenAI content distinguishes applied workflows from broader model-ecosystem awareness. Practical work is described most strongly around ChatGPT, Google Gemini and Gemini Veo; it does not claim equal expert proficiency across all model families. The paid-media section describes planning fundamentals and platform knowledge, not unverified live-spend results, ROAS figures or certifications.

## Deployment

Upload the complete project to the root of the GitHub Pages repository. Keep `assets/`, `index.html`, `styles.css` and `script.js` at the same relative paths. GitHub Pages should use branch `main` and folder `/ (root)`. See `UPLOAD-TO-GITHUB.txt` for replacement steps.
