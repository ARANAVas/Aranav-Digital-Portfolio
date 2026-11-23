# V19 Security & Deployment Guide

## Security model
This is a static public portfolio. It contains no login, database, API endpoint or analytics tracker. The contact composer validates a name, email and message in the browser and opens a prefilled `mailto:` draft. The visitor reviews and sends the message using their own email application; the site does not store or transmit submissions.

## Included
- Restrictive meta CSP and referrer policy.
- `vercel.json` response headers for Vercel.
- `_headers` response headers for Netlify / Cloudflare Pages.
- Same-origin scripts, no inline scripts or event handlers, safe external new-tab links.
- Input validation and length limits in the client-side message composer.
- HTML revalidation and immutable caching for versioned files on supported hosts.

## GitHub Pages
GitHub Pages does not apply `vercel.json` or `_headers` as HTTP response-header rules. Its HTML meta CSP and referrer policy still apply. Response-only policies including HSTS, `frame-ancestors`, X-Frame-Options, X-Content-Type-Options and Permissions-Policy require a host supporting these configuration files.

For GitHub Pages:
1. Repository Settings → Pages → enable **Enforce HTTPS**.
2. Enable 2FA/passkeys on the GitHub account.
3. Do not commit passwords, personal access tokens, API keys or confidential files.
4. Keep the repository public only if the portfolio and résumé are intended to be public.
5. Review changes before updating the production branch.

For full response headers, deploy to Vercel (uses `vercel.json`) or Netlify / Cloudflare Pages (uses `_headers`). Verify the actual document response headers in DevTools after deployment.

## Contact composer
The form's submit handler generates a `mailto:` draft for `aranavprime@gmail.com`. It is not a backend form, does not automatically send email and does not store input. For direct website submissions later, choose a reputable form provider/endpoint with spam protection, rate limiting, validation and a privacy notice. Never place secret API keys in browser code.

## Release checklist
- HTTPS and certificate work on the live domain.
- Response headers match the selected host.
- No CSP violations in DevTools Console.
- Logo video and poster fallback work.
- Reduced-motion and data-saving behavior work.
- All doors and detail controls work on touch and keyboard.
- Message fields validate and produce a correct email draft.
- Résumé and social links work.
- Run Lighthouse on the deployed website and record actual results.
