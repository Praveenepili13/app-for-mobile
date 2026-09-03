# Rank Engine — Capacitor setup

This branch adds a minimal Capacitor scaffold (Option A: static web assets) so your existing HTML site can be wrapped as a native Android/iOS app.

What I added on the capacitor-setup branch:

- package.json (scripts to prepare web assets and run Capacitor commands)
- capacitor.config.json (appId, appName, webDir)
- scripts/copy-web.js (node script that copies root HTML/CSS/JS and common asset folders into ./www)
- assets/icons/icon-192.svg and icon-512.svg (placeholder app icons)
- .gitignore
- README.md (this file)

How to finish locally (run these from the repo root):

1. Install dependencies

   npm install

2. Prepare the web directory (copies your HTML/CSS/JS and asset folders into ./www)

   npm run prepare-web

3. Initialize Capacitor (this writes native project files into the repo when you add platforms)

   npm run cap:init

4. Add Android/iOS platforms (pick one or both). Example for Android:

   npm run cap:add:android
   npm run cap:copy
   npm run cap:open:android

   For iOS (macOS required):

   npm run cap:add:ios
   npm run cap:copy
   npm run cap:open:ios

Notes:
- Replace the placeholder icons in assets/icons with PNGs for proper store submission.
- If you prefer not to commit native projects (android/ios) into git, add them to .gitignore before running `cap add`.

If you want, I can:
- Add Android and/or iOS platform projects here and commit them (I will need to run the Capacitor CLI commands which I can't run from this environment). Or I can provide exact commands and help resolve any issues when you run them locally.
- Convert this to a Vite-based workflow (Option B) instead.

