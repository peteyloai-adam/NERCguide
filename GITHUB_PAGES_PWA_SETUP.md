# GitHub Pages + iPad Offline Setup

This package is the GitHub Pages / Progressive Web App edition of the NERC System Operator Study Console.

## What this edition does

- Installs to the iPad Home Screen as a web app.
- Caches every local runtime file required by the study console.
- Runs the lessons, questions, glossary, interactives, mock exams, study plans, integrated events, and locally stored progress without an internet connection after the first successful cache.
- Shows `Offline ready` when the local cache is complete.
- Shows `Offline mode` when the device is disconnected and the cached application is in use.
- Supports controlled service-worker updates after a newer package is published.

External video links are intentionally not cached and still require internet access.

## Publish to GitHub Pages

1. Create or open the GitHub repository that will host the study console.
2. Put the **contents of this folder at the repository root**. `index.html`, `sw.js`, and `manifest.webmanifest` should be visible at the top level of the repository.
3. Commit and push the files to the branch you want to publish, normally `main`.
4. Open the repository's **Settings**.
5. Open **Pages** under Code and automation.
6. Under Build and deployment, choose **Deploy from a branch**.
7. Select the publishing branch and choose **/(root)** as the folder.
8. Save the Pages configuration and wait for GitHub to publish the site.

The application uses relative URLs, so it works as either a user Pages site or a project Pages site under a repository subdirectory.

## Install on iPad

The first installation must be completed while the iPad has internet access.

1. Open the published GitHub Pages URL in **Safari**.
2. Leave the page open until the top status indicator says **Offline ready**. You can also confirm the cache under **Data & accessibility → Offline iPad app**.
3. Tap Safari's **Share** button.
4. Choose **Add to Home Screen**.
5. Turn on **Open as Web App**.
6. Tap **Add**.
7. Open the new `NERC Study` icon from the Home Screen.
8. Before relying on it away from Wi-Fi, turn on Airplane Mode and confirm that lessons, practice questions, glossary, interactives, and a mock exam still open.

## Progress on iPad

Learner progress stays in the web app's local browser storage. It does not sync through GitHub.

Use **Data & accessibility → Export progress JSON** periodically. The exported file can be stored in Files, iCloud Drive, Google Drive, or another location and imported later if the browser data is cleared or the learner changes devices.

## Publishing a future course update

When local CSS, JavaScript, icons, or other runtime files change, regenerate the service-worker cache before publishing:

```bash
python3 scripts/build_pwa_cache.py --cache-version pwa2
node scripts/pwa_validate.js
node scripts/validate.js
node scripts/smoke.js
```

Use a new cache version each release (`pwa2`, `pwa3`, a date, and so on). This makes the installed iPad application recognize that a new offline package exists.

After the updated repository is published, open the installed app while online. It will check the service worker automatically. You can also use **Data & accessibility → Check for updates**. When `Update available` appears, choose **Install available update**.

Learner progress is stored separately from the offline application cache, so installing a new cached release does not intentionally erase progress.

## Important GitHub Pages consideration

GitHub Pages is a web-publishing service. Before publishing training material, confirm that the content is appropriate for the visibility of the Pages site and the repository configuration you intend to use.
