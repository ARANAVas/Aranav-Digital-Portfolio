# V19 Security Audit — Static Portfolio

## Included controls
- Meta Content Security Policy limits scripts to same-origin, restricts resource origins, disables objects and embedded frames, and requests mixed-content upgrades.
- `vercel.json` and `_headers` contain response-header policies for compatible hosts.
- `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, strict referrer policy, restrictive permissions policy, HSTS and COOP are configured in the host-specific files.
- No inline scripts, inline event handlers or inline style attributes in HTML.
- External new-tab links set `noopener noreferrer`.
- No `innerHTML`/`outerHTML`/`eval`/`new Function`/`document.write` sink was found in the main application script.
- No high-confidence secret patterns found in audited HTML/JS text; this is a pattern scan, not a guarantee for binary files or every conceivable secret format.
- The contact composer validates inputs and creates a local `mailto:` draft. It sends nothing to the website and does not store messages.

## Hosting boundary
Standard GitHub Pages branch publishing does not consume `vercel.json` or `_headers` as HTTP response-header configuration. Meta CSP/referrer policy still apply, but headers such as HSTS, `frame-ancestors`, X-Frame-Options, X-Content-Type-Options and Permissions-Policy require a host that supports response-header rules. Enable Enforce HTTPS in GitHub Pages settings and verify the actual live response headers after deployment.

## Limitations
No server-side authentication, database, API, spam filtering, rate limiting or contact submission endpoint exists. No external penetration test, live host scan or Lighthouse/Core Web Vitals measurement has been performed. Enable GitHub 2FA/passkeys and protect repository access separately.
