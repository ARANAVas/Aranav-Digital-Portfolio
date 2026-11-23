# V21.2 — Core Craft Edition

## Visual system

- Rebuilt the core dual-theme design: midnight-blue/black dark mode with blue accents, and porcelain-white/blush light mode with oxblood-red accents.
- Consolidated the final theme layer so inherited components use the same Manrope / Cormorant Garamond typography and current theme colours.
- Corrected high-specificity legacy text rules that previously forced pale foregrounds onto light surfaces, including the Skills panel, captions, Selected Work notes and contact heading.
- Made the sticky navigation fully opaque in both themes, preventing section headings from bleeding through it during scroll.
- Refined type hierarchy, labels, project-card contrast, tags and section spacing while retaining the original content and project assets.

## Skills doors

- Kept all four Skills areas and their detail content.
- Added layered timber finishes, raised inset panels, arch framing, metallic hinges, brass handles, keyholes, door edge and illuminated portals.
- Added a 3D perspective swing from the left hinge with a separate details-panel reveal.
- Replaced timer-only coordination with a transition-aware state machine (`closed → opening → open → closing → closed`) and a bounded timeout fallback.
- Retained keyboard focus management, Escape-to-close, next-skill navigation, ARIA state, touch support and reduced-motion handling.
- Updated skill descriptions and detail copy without inventing qualifications, statistics or outcomes.

## Core, accessibility and performance

- Kept one active local CSS request per HTML page; cache-busting query version advanced to `21.2` so previous immutable CSS/JS files do not remain in use after deployment.
- Replaced the scroll progress indicator's inline `style.transform` update with a native `<progress>` element while retaining the restrictive `style-src-attr 'none'` CSP directive.
- Fixed three malformed legacy `@keyframes` declarations.
- Removed duplicated mobile-navigation cleanup and updated Vercel cache entries for current resources.
- Preserved lazy video loading, optimized WebP stills, responsive supporting-photo `srcset`, and data-saver / reduced-motion playback guardrails.

## Release status

Static validation and in-memory Chromium runtime checks pass for the recorded test cases. Emulated viewport tests are not the same as tests on physical phones, tablets or live hosting. This release has not been deployed. See `V21-QA-REPORT.md` and `V21-DEVICE-CHECKLIST.md`.
