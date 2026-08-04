# Search Console verification deployment

The production build fetches public landing-page settings and injects configured
Google, Bing, and Facebook verification tags into `build/index.html`. No token is
stored in source control.

## Build

Requirements: Node.js 18+ and the project's existing Yarn version.

```bash
cd frontend
export REACT_APP_PLATFORM_API_BASE=https://app.dynicty.com
yarn install --frozen-lockfile
yarn test:seo-verification
CI=true yarn build
```

`yarn build` runs the React production build first, then executes
`scripts/inject-seo-verification.js`. The build intentionally fails if the
public settings endpoint cannot be read, preventing deployment of an
unverified/stale artifact.

Before uploading the build, verify the generated raw HTML:

```bash
grep -i "google-site-verification" build/index.html
grep -i "msvalidate.01\|facebook-domain-verification" build/index.html
```

Deploy the generated `frontend/build/` directory using the existing Dynicty
landing-page deployment process. Do not deploy `frontend/public/index.html`
directly; verification tags exist in the post-build artifact.

## Production verification

After deployment, bypass caches when checking the served source:

```bash
curl -fsS -H 'Cache-Control: no-cache' https://dynicty.com/ | grep -i "google-site-verification"
```

The command must return exactly one Google verification meta tag. Also open
**View Page Source** for `https://dynicty.com` and search for
`google-site-verification`.

If an old tag is still served, invalidate the CDN cache for `/` and `index.html`,
then repeat the curl check. A rollback consists of redeploying the previous
known-good `build/` artifact; no API, database, or platform rollback is needed.
