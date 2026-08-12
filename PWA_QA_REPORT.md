# PWA QA Report

**Edition:** 3.2.0-remediated-pwa1  
**Target:** GitHub Pages and iPadOS Safari Home Screen installation

## Existing study-console regression gates

- `node scripts/validate.js`: **88 passed, 0 failed**
- `node scripts/smoke.js`: **19 passed, 0 failed**

These retain the v3.2 content, assessment, standards-linkage, accessibility-signal, and clean-package checks.

## PWA-specific gates

- `node scripts/pwa_validate.js`: **21 passed, 0 failed**

Validated:

- relative manifest URL
- iPad standalone metadata
- Apple touch icon
- 192 × 192, 512 × 512, and maskable manifest icons
- relative `start_url` and `scope` for GitHub project Pages paths
- `.nojekyll` marker
- complete local runtime precache list
- every declared cache asset exists
- service-worker install, activate, fetch, and message handlers
- complete precache installation
- offline-ready notification
- cached index fallback for offline navigation
- cached static-asset response while offline

## Environment limitation

The review container blocks browser navigation to locally served HTTP origins. As a result, a real browser service-worker install could not be exercised against the local test server in this environment. The service worker was instead executed against a mocked Cache Storage/fetch environment, while the existing study-console browser QA from the v3.2 release remains applicable to the underlying application.

A final device acceptance test should be performed after publishing to GitHub Pages:

1. Open the site on the target iPad in Safari.
2. Confirm `Offline ready`.
3. Add it to the Home Screen with `Open as Web App` enabled.
4. Launch the Home Screen app.
5. Enable Airplane Mode.
6. Reload/open multiple lessons, glossary, an interactive, practice questions, and a mock exam.
7. Export a progress JSON file.
8. Reconnect, publish a test cache-version update, and confirm the update workflow.
