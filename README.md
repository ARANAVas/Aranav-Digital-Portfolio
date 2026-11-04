# Aranav — Digital Marketing & Applied AI Portfolio (V10)

A responsive, single-page professional portfolio with a premium white + crimson-red default and a cinematic midnight alternate. The skills section uses four arched 3D doors. Selecting a door now creates a full camera-entry sequence before revealing its skill detail.

## Preview locally

Open `index.html` in a modern browser, or run:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## What's new in V10

- Added a multi-stage skill-door entrance based on the supplied reference video: camera approach/zoom, hinged door swing, portal push-in and skill-page reveal.
- The selected card's original door fades away while the enlarged clone travels forward, avoiding a duplicated door during the effect.
- The camera portal expands to cover the viewport before the skill detail is revealed; the temporary overlay is then removed and page scrolling is restored.
- Added mobile-aware transition geometry so the portal fills narrow screens without creating horizontal page overflow.
- Preserved the white + crimson-red default theme and the alternate cinematic dark theme.
- Preserved all four skill areas, photo gallery, recruiter-friendly resume links and current portfolio content.
- `prefers-reduced-motion` skips the cinematic movement and opens the skill details directly, without leaving a transition overlay or scroll lock behind.

## V10 core maintenance fixes

- Reframed the story portraits into proportionate vertical profile cards with readable captions.
- Balanced the story/photo layout and tablet breakpoint to avoid compressed columns.
- Rebuilt both Back to Top controls as real scroll actions; the floating control appears only after scrolling and works with keyboard focus.
- Fixed Back to Doors so it returns to the actual doors grid position.
- Preserved the white + crimson first-visit theme, alternate dark theme, and the existing four-stage V10 door-entry animation.
- Rechecked 20 responsive viewport/theme combinations (10 widths × 2 themes), all four lazy-loaded photos, all four desktop door exit paths, mobile reverse transitions at 320px and 390px, both Back to Top controls, Next Skill and reduced-motion handling. See `QA-REPORT.txt` for limitations and exact scope.

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
- Door overlay is removed after the transition and the page scroll lock is released

## V10 door interaction sequence

1. **Approach:** a single selected door grows from its original card position toward the centre of the viewport.
2. **Open:** the door slab rotates on its left hinge; its front label fades instead of appearing mirrored.
3. **Enter:** the dark recessed portal pushes toward the viewer and scales beyond the viewport, creating the impression of moving through the doorway.
4. **Reveal:** the matching skill detail view appears, the overlay fades away, and normal scrolling resumes.

## QA and deployment

The V10 interaction was exercised in Chromium at desktop size and narrow mobile sizes, including all four doors in full-motion mode and reduced-motion mode. See `QA-REPORT.txt` and `QA-REPORT.json` for the exact checks and limitations.

Upload the complete project to the root of the GitHub Pages repository. Keep `assets/`, `index.html`, `styles.css` and `script.js` at the same relative paths. GitHub Pages should use branch `main` and folder `/ (root)`. See `UPLOAD-TO-GITHUB.txt` for replacement steps.


## V10 final polish update
- Added a reverse cinematic exit matching the entry journey: the camera retreats from the skill detail through the portal, resolves into the selected door, and the door swings shut.
- Corrected return-door geometry to use the stable door-button frame rather than the still-rotating 3D door bounds.
- Removed the detached decorative orbit outline behind the hero portrait while preserving the portrait’s own frame.
- Converted both camera-shell movements to transform-based composited animation to reduce per-frame layout work.
- Kept reduced-motion and Next Skill paths direct and accessible.


## V10 photo clarity and loading refinement

- Enhanced all four existing photographs with conservative luminance-local contrast and edge sharpening. Faces and compositions were not regenerated.
- Added responsive WebP candidates: 640px variants for hero/workspace photos, plus 320px and 640px profile-photo thumbnails; full-resolution sources remain available for high-density screens.
- Matched the hero preload's `imagesrcset` and `imagesizes` to the hero image's `srcset`/`sizes` so the browser can choose the same candidate without fetching an unnecessary duplicate.
- Kept below-the-fold imagery lazy-loaded and asynchronously decoded.

## V10 motion and performance refinement

- Smoothed camera approach and return easing, door hinge swing and portal travel timing.
- Kept camera-shell geometry on `transform` transitions rather than animating `left`, `top`, `width` and `height`.
- Focused transition changes on `transform` and `opacity`, avoiding animated layout dimensions and unnecessary filter transitions.
- Retained the complete entry and exit journey for all four doors and the reduced-motion direct-navigation path.
- Latest QA: 20 responsive/theme combinations, 4/4 photo load checks, all four desktop door entry/exit flows, 320px/390px mobile exit checks, Next Skill and both Back to Top controls. See `QA-REPORT.txt`.
