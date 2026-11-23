# V21 Security & Deployment Notes

## Security model

This is a static public portfolio. It has no login, database, API endpoint or analytics tracker. The contact composer validates a name, email and message in the browser, then opens a prefilled `mailto:` draft to `aranavprime@gmail.com`. The visitor reviews and sends the message in their own email application. The site does not store or transmit form submissions.

## Included controls

- Restrictive meta Content Security Policy and referrer policy.
- Same-origin JavaScript and CSS; no inline scripts, event handlers or inline style attributes.
- `style-src-attr 'none'` remains enabled. The reading progress indicator uses the native `<progress>` value property rather than writing inline styles.
- Safe `rel="noopener noreferrer"` for external links opened in a new tab.
- Client-side input validation and length limits in the message composer.
- `vercel.json` response headers for Vercel.
- `_headers` response headers for Netlify / Cloudflare Pages.

## GitHub Pages limitation

GitHub Pages does not apply `vercel.json` or `_headers` as HTTP response-header rules. The HTML meta CSP and referrer policy still apply, but response-only controls including HSTS, `frame-ancestors`, X-Frame-Options, X-Content-Type-Options and Permissions-Policy require a host that supports response-header configuration.

For GitHub Pages:

1. Repository Settings → Pages → enable **Enforce HTTPS**.
2. Enable 2FA or passkeys on the GitHub account.
3. Never commit passwords, access tokens, API keys or confidential files.
4. Keep the repository public only if the portfolio and résumé are intended to be public.
5. Review changes before updating the production branch.

For full response headers, deploy to Vercel (uses `vercel.json`) or Netlify / Cloudflare Pages (uses `_headers`). Verify actual response headers in browser DevTools after deployment.

## Release verification still required

After deployment, verify HTTPS, response headers for the selected host, absence of CSP errors, logo video / poster fallback, reduced-motion and data-saving behavior, all four door interactions on touch and keyboard, contact validation, résumé download, and external links. Run Lighthouse against the deployed site and record the actual results. See `V21-DEVICE-CHECKLIST.md`.
