# Aranav — Digital Marketing & Applied AI Portfolio (V8 QA Refined)

A premium, responsive single-page portfolio with a cinematic midnight theme and an alternate white + crimson-red theme. The central skills section uses four interactive arched doors; each opens a focused skill-detail view with a return control.

## Preview locally

Open `index.html` in a modern browser, or run:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Main sections

- Hero with professional portrait, rotating specialisations and contact CTA
- Four interactive skill doors: Digital Marketing & Paid Media, SEO & Website, AI & Generative AI, and Data & Operations
- Selected work and practical examples
- Professional experience at EliteFinish, RICOZ Innovation and IT Hub Solution
- Personal story and current B.Sc. Physics education
- Contact dialog with email, LinkedIn and copy-email actions

## Theme options

- First-visit default: cinematic midnight / dark theme
- Alternate: premium white surfaces, graphite typography and restrained crimson-red accents
- The chosen theme is applied before first paint and saved in browser storage when available

## Typography

- Manrope for interface and body copy
- Cormorant Garamond for editorial/serif emphasis
- Native system monospace for compact labels and metadata, avoiding a third font download
- Google Fonts use `display=swap`; robust system fallbacks remain available if the font service is unavailable

## Included interactions

- 3D hinged-door animation followed by a skill-detail view
- Back-to-doors and next-skill navigation, with Escape-key support
- Responsive mobile navigation with correct expanded state
- Theme switch with accessible labels and browser preference persistence
- Contact dialog, mail links and copy-email fallback
- Scroll reveals, short role rotation and reduced-motion support

## Performance and accessibility

- Plain HTML, CSS and JavaScript; no framework or animation libraries
- WebP photography; hero image preloaded with high fetch priority
- Below-the-fold images lazy-loaded and asynchronously decoded
- Image dimensions declared to reduce layout shift
- Responsive safeguards tested from 320px through 1440px
- Semantic sections, descriptive image alt text, button-based skill controls and visible focus states
- Reduced-motion mode and fallback behaviour when IntersectionObserver is unavailable
- No custom pointer-following animation or third-party JavaScript dependency

## Skills and AI positioning

AI/GenAI content distinguishes applied workflows from broader model-ecosystem awareness. Practical work is described most strongly around ChatGPT, Google Gemini and Gemini Veo; it does not claim equal expert proficiency across all model families. The paid-media section describes planning fundamentals and platform knowledge, not unverified live-spend results, ROAS figures or certifications.

## Deployment

Upload the complete project to the root of the GitHub Pages repository. Keep `assets/`, `index.html`, `styles.css` and `script.js` at the same relative paths. GitHub Pages should use branch `main` and folder `/ (root)`. See `UPLOAD-TO-GITHUB.txt` for the replacement steps.
