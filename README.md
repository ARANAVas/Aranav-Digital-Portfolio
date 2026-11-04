# Aranav Sharma — Digital Marketing Portfolio

A responsive, single-page personal portfolio inspired by the supplied reference video. Built with plain HTML, CSS and JavaScript; no build step or framework dependency is required.

## Preview locally

Open `index.html` in a modern browser, or run a local static server from this folder:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Files

- `index.html` — page structure, accessible navigation, resume-based content and metadata
- `styles.css` — light/dark themes, responsive layouts, hover states and motion design
- `script.js` — loader, local clock, theme control, role typewriter, scroll reveals, mobile navigation and subtle cursor effects
- `assets/Aranav-Sharma-Resume.pdf` — resume linked from the contact section
- `assets/photos/` — four optimized WebP profile photographs supplied for this portfolio

## Included interactions

- Light/dark theme toggle (remembers the visitor's choice when browser storage is available)
- Mobile navigation with Escape-key support
- Typewriter role strip with fixed, short phrases
- Scroll-triggered entrance animations
- Click-to-open arched skill doors with a 3D swing animation and skill details
- Accessible contact dialog with email, LinkedIn and copy-email actions
- Desktop hover/cursor effects, disabled for touch devices and reduced-motion settings
- Resume opens in a new tab; the Start a conversation buttons open an accessible contact chooser with email, LinkedIn and copy-email actions

## Accessibility and performance

- Semantic section landmarks, accessible buttons and image alt text
- Responsive layouts for desktop, tablet and mobile widths, with touch-friendly door controls
- Reduced-motion preference support
- WebP profile images, lazy loading for below-the-fold imagery, and preload for the hero image
- No large animation libraries or external runtime dependencies

## Deploy

Upload the complete folder to GitHub Pages, Netlify or Vercel as a static site. Keep the `assets` folder alongside `index.html` so the resume and images load correctly.
