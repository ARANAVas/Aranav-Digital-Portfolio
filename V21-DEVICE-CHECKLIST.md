# V21.2 post-deployment device checklist

Chromium tests in the QA report use emulated screen sizes. Complete these additional checks on real devices after the GitHub Pages deployment.

## Device matrix

- Small Android phone: around 320–360 px CSS width.
- Standard Android phone: around 390–430 px CSS width.
- iPhone Safari: current and one older supported iOS version, where available.
- Tablet: around 768–900 px CSS width, portrait and landscape.
- Laptop: 1024–1440 px.
- Wide monitor: 1920 px or wider.

At each size, check clipped text, horizontal scrolling, overlapping cards, door hardware clipping, tap targets and sticky-header legibility.

## Theme checks

1. Open in dark mode and confirm midnight-blue/black surfaces with blue accents.
2. Switch to light mode and confirm white/blush surfaces with oxblood-red accents and readable text.
3. Scroll with the header sticky and confirm that content does not show through it.
4. Reload and confirm the selected theme persists.
5. Inspect the hero, Skills, Selected Work, statement, Experience, About, Education, Contact and footer in both themes.

## Skills door checks

1. Open each of the four doors by mouse and touch.
2. Confirm the door swings from the left hinge, the hardware stays visually attached and the skill panel appears.
3. Use “Back to the doors” and wait for the full swing to finish; confirm the door is fully closed and the detail panel is gone.
4. Use “Next skill” and confirm the next detail appears without stuck state.
5. Press Escape while a panel is open and while a door is opening.
6. Use Tab / Shift+Tab / Enter / Space to operate controls.
7. Enable the operating system's reduced-motion preference before loading the page and confirm the skill details remain usable without a swing animation.

## Other interactions

- Open and close the mobile navigation.
- Switch themes using keyboard and pointer/touch.
- Open each Selected Work case note.
- Open and close the contact dialog; test required-field validation.
- Confirm a valid contact request creates a prefilled draft addressed to `aranavprime@gmail.com`.
- Download the résumé and open privacy and 404 pages.
- Confirm the logo video shows its poster first, plays when appropriate, and is skipped for reduced-motion, data-saver or slow-connection preferences.

## Performance follow-up

- Run Lighthouse on the deployed URL in mobile and desktop modes.
- Record LCP, INP, CLS, total transfer size and any blocking resources.
- Check that GitHub Pages serves HTTPS and confirm deployed security headers separately; GitHub Pages will not apply `_headers` or `vercel.json` as HTTP response rules.

Record issues with device/browser, screen width, theme, steps to reproduce and a screenshot before applying targeted changes.
