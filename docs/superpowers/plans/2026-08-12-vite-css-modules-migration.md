# CRA → Vite + Sass → CSS Modules Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace `react-scripts` (CRA) with Vite, and replace global Sass styling with CSS Modules + plain CSS, without changing any visible behavior of the app.

**Architecture:** Task 1 swaps the build tool while temporarily keeping the existing `.scss` files working under Vite (via the `sass` package). Tasks 2–14 then convert styling file-by-file from Sass to CSS Modules / plain CSS, removing the `sass` dependency once the last file is converted in Task 15. No automated tests exist in this repo; every task ends with a manual verification step (`npm run dev` + visual check, or `npm run build`).

**Tech Stack:** Vite, `@vitejs/plugin-react`, TypeScript, React 16.14, CSS Modules (native Vite support), plain CSS custom properties (no CSS-in-JS, no new dependencies).

## Global Constraints

- No automated tests exist in this repo and none are being added — every task's "verify" step is a manual `npm run dev` walkthrough or `npm run build`, per `docs/superpowers/specs/2026-08-12-vite-css-modules-migration-design.md`.
- Dev server must stay on port 3000 (spec requirement).
- `netlify.toml`'s `publish = "build"` must keep resolving — `build.outDir` stays `"build"`.
- No new npm dependencies beyond `vite`, `@vitejs/plugin-react`, `vite-tsconfig-paths`, and the temporary `sass` (removed in Task 15). No `classnames`/`clsx`.
- Every `.tsx`/`.js` component's rendered DOM/classes must be pixel-identical before and after its conversion task — this is a build-tool and styling-architecture migration, not a redesign.
- Commit after every task.

---

## Task 1: Vite bootstrap

Replace `react-scripts` with Vite. The existing `.scss` files keep working during this task via the `sass` package (Vite's built-in SCSS support) — they get converted to plain CSS Modules in later tasks, not this one.

**Files:**
- Create: `vite.config.ts`
- Create: `index.html` (repo root)
- Delete: `public/index.html`
- Delete: `src/setupProxy.js`
- Modify: `src/firebase/firebase-setup.ts`
- Modify: `src/react-app-env.d.ts`
- Modify: `tsconfig.json`
- Modify: `package.json`

**Interfaces:**
- Produces: `npm run dev` (dev server on port 3000, `/wine-api` proxied to `localhost:9000`), `npm run build` (outputs to `build/`). Later tasks depend on both commands existing and working.

- [ ] **Step 1: Install Vite dependencies**

```bash
npm install --save-dev vite @vitejs/plugin-react vite-tsconfig-paths sass
```

`vite-tsconfig-paths` is required, not optional: the codebase's absolute imports have no `src/` prefix (e.g. `import App from "App"`, `import AddWineForm from "components/add-wine/AddWineForm"`) — they rely on tsconfig's `"baseUrl": "src"` meaning every bare specifier resolves relative to `src/`. A plain `resolve.alias: { src: ... }` in `vite.config.ts` would only match specifiers literally starting with `src/`, which none of these are, so it would silently fail to resolve any of them. `vite-tsconfig-paths` reads `tsconfig.json`'s `baseUrl` directly and reproduces TypeScript's own resolution behavior.

- [ ] **Step 2: Create `vite.config.ts`**

```typescript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  server: {
    port: 3000,
    proxy: {
      "/wine-api": {
        target: "http://localhost:9000",
        changeOrigin: true
      }
    }
  },
  build: {
    outDir: "build"
  }
});
```

- [ ] **Step 3: Delete `src/setupProxy.js`**

Its proxy behavior is now expressed in `vite.config.ts`'s `server.proxy` above.

- [ ] **Step 4: Move and rewrite `index.html`**

Delete `public/index.html`, create `index.html` at the repo root:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#4B6566" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta
      name="apple-mobile-web-app-status-bar-style"
      content="black-translucent"
    />
    <link rel="shortcut icon" href="/favicon.ico" />
    <link rel="manifest" href="/manifest.json" />
    <link
      rel="apple-touch-icon"
      sizes="180x180"
      href="/images/wine-logo-apple.png"
    />
    <title>Vinolini</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/index.tsx"></script>
  </body>
</html>
```

- [ ] **Step 5: Rename env vars in `src/firebase/firebase-setup.ts`**

Replace lines 6-14:

```typescript
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_DATABASE_URL,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID
};
```

- [ ] **Step 6: Add `VITE_*` env vars to your local shell / Netlify dashboard**

Vite reads env vars from `.env` files or the process environment at build/dev time — not from the repo. Add these to whatever you use to run `npm run dev` locally (e.g. export them in your shell, or create a git-ignored `.env.local` with `VITE_API_KEY=...` etc., one line per var from Step 5), using the same values as the current `REACT_APP_*` ones. In the Netlify dashboard, add the seven `VITE_*` vars (same values as the existing `REACT_APP_*` ones); remove the old `REACT_APP_*` ones only after this branch is confirmed working in production.

- [ ] **Step 7: Update `src/react-app-env.d.ts`**

```typescript
/// <reference types="vite/client" />
```

- [ ] **Step 8: Update `tsconfig.json`**

Change `"moduleResolution": "node"` to `"moduleResolution": "bundler"`, and add a `"types"` entry. Full `compilerOptions` block:

```json
{
  "compilerOptions": {
    "baseUrl": "src",
    "target": "es5",
    "lib": [
      "dom",
      "dom.iterable",
      "esnext"
    ],
    "noImplicitAny": false,
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "preserve",
    "downlevelIteration": true,
    "types": ["vite/client"]
  },
  "include": [
    "src"
  ]
}
```

- [ ] **Step 9: Update `package.json` scripts and dependencies**

Replace the `"scripts"` block:

```json
"scripts": {
  "dev": "concurrently \"vite\" \"npm run start-server\"",
  "build": "concurrently \"vite build\" \"npm run build-server\"",
  "start-server": "netlify-lambda serve netlify-functions",
  "build-server": "NODE_OPTIONS=--openssl-legacy-provider netlify-lambda build netlify-functions"
},
```

The `NODE_OPTIONS=--openssl-legacy-provider` prefix on `build-server` fixes a pre-existing, unrelated failure: `netlify-lambda`'s bundled webpack 4 uses a legacy OpenSSL API call that Node 17+'s OpenSSL 3 rejects (`ERR_OSSL_EVP_UNSUPPORTED`). This reproduces identically on the original, unmigrated codebase — it's not caused by anything else in this task — but since `npm run build` must exit 0 end-to-end, it's fixed here rather than left as a known issue. `start-server` (webpack-dev-server based) doesn't hit this at all and is left unchanged.

Remove these dependencies (no longer used): `react-scripts`, `case-sensitive-paths-webpack-plugin`, `http-proxy-middleware`.

Remove the `"browserslist"` block entirely (not read by Vite/esbuild).

```bash
npm uninstall react-scripts case-sensitive-paths-webpack-plugin http-proxy-middleware
```

- [ ] **Step 10: Verify dev server**

Run: `npm run dev`

Expected: Vite starts on `http://localhost:3000`, the page loads showing the app (search page), and the browser console shows no Firebase initialization errors (confirms the `VITE_*` env vars from Step 6 are being read correctly). Manually click through to at least one other route (e.g. "Legg til") to confirm client-side routing still works.

- [ ] **Step 11: Verify production build**

Run: `npm run build`

Expected: exits 0, and a `build/` directory is created containing `index.html` and hashed JS/CSS assets.

- [ ] **Step 12: Commit**

```bash
git add -A
git commit -m "build: migrate from create-react-app to Vite"
```

---

## Task 2: Global styles and design tokens

Create the two global (non-module) CSS files that every component either implicitly (via `index.tsx`) or explicitly relies on, replacing the root `src/styles.scss` and the Sass variable partials. The four Sass partials (`variables.scss`, `_colors.scss`, `_properties.scss`, `mixins.scss`) are **not** deleted yet — component `.scss` files still `@import` them until their own conversion task runs.

**Files:**
- Create: `src/styles/tokens.css`
- Create: `src/styles/global.css`
- Modify: `src/index.tsx`
- Delete: `src/styles.scss`
- Delete: `src/components/basement/styles.scss` (dead file — not imported anywhere; `basement` elsewhere is only an unrelated Firebase index name in `src/firebase/indices.ts`)

**Interfaces:**
- Produces: CSS custom properties consumed by every later task (`--form-text-color`, `--base-background-color`, `--form-background-color`, `--form-input-color`, `--form-error-color`, `--header-background-color`, `--wine-item-card-header-background-color`, `--wine-item-card-header-text-color`, `--image-checkbox-checked-background-color`, `--button-reset-color`, `--button-confirm-color`, `--button-text-color`, `--wine-item-card-width__phone`, `--wine-item-card-width__tablet_up`, `--input_padding`, `--form-width`). Produces global classes `.error`, `.page-title`, `.wine-input-container` (+ its `input`/`p` children), `.react-select`, `.wine-picture`, `.wine-search-form__button`, `.image` — every later task assumes these already exist globally and does not redefine them.

- [ ] **Step 1: Create `src/styles/tokens.css`**

```css
:root {
  --form-text-color: black;
  --base-background-color: #20292f;
  --form-background-color: white;
  --form-input-color: #f4f3f6;
  --form-error-color: #E63D3D;
  --header-background-color: #4B6566;
  --wine-item-card-header-background-color: #4B6566;
  --wine-item-card-header-text-color: #fff;
  --image-checkbox-checked-background-color: #87d7f0;
  --button-reset-color: #3281a8;
  --button-confirm-color: #04d19a;
  --button-text-color: #3f5354;
  --wine-item-card-width__phone: 85vw;
  --wine-item-card-width__tablet_up: 320px;
  --input_padding: 14px;
  --form-width: 85vw;
}
```

- [ ] **Step 2: Create `src/styles/global.css`**

This is the direct plain-CSS translation of `src/styles.scss`, plus three classes promoted here from component files because they're used across unrelated component trees (documented per-class below):

```css
body, button {
  margin: 0;
  padding: 0;
  font-family: HelveticaNeue, serif;
  background-color: var(--base-background-color);
}

form {
  background-color: var(--form-background-color);
  color: var(--form-text-color);
  font-size: 1.2em;
  padding: 0.5em;
  margin: 1em 0;
  border-radius: 14px;
}
@media (max-width: 599px) {
  form {
    font-size: 1.1em;
  }
}

button {
  font-size: 20px;
  background: none;
  color: var(--button-text-color);
  padding: 4px 16px;
  border-radius: 14px;
  border-color: transparent;
}

.error {
  color: var(--form-error-color);
  font-size: 0.8em;
}

.wine-input-container {
  display: flex;
  justify-content: left;
  align-items: center;
  background-color: var(--form-input-color);
  width: 100%;
  height: 35px;
  margin-top: 10px;
  font-size: 1em;
  border-radius: 24px;
  border: 1px solid grey;
  color: hsl(0, 0%, 20%);
}
.wine-input-container p {
  padding: 0px 0px 0px var(--input_padding);
}
.wine-input-container input {
  font-size: 1em;
  padding: 0px 0px 0px var(--input_padding);
  border: none;
  background: none !important;
  width: 100%;
  height: 90%;
}

.page-title {
  color: white;
  font-weight: normal;
}

.react-select {
  margin-top: 10px;
}

.react-select__multi-value__remove {
  display: none !important;
}

@font-face {
  font-family: HelveticaNeue;
  src: url("../fonts/HelveticaNeueMed.ttf");
}

/* Used by AddWineForm.tsx (add-wine-form.scss) and WineDetailsComponent.tsx
   (wine-details.scss) — promoted here because both unrelated component
   trees render a wine product photo with this exact class. */
.wine-picture {
  width: 100px;
  display: block;
  margin-left: auto;
  margin-right: auto;
}

/* Used by WineFilterForm.tsx (wine-search-form.scss), LookUpComponent.tsx,
   and WineSuggesterPage.tsx for a small icon+text button — promoted here
   because it's shared across three unrelated component trees. */
.wine-search-form__button {
  align-items: center;
  display: flex;
  color: black;
  font-size: 18px;
  background: none;
}

/* Used by image-checkbox.tsx (image-checkbox.scss) and
   WineSuggesterPage.tsx for small food-category icons — promoted here
   because it's shared across two unrelated component trees. */
.image {
  width: 50px;
}
@media (min-width: 600px) {
  .image {
    width: 60px;
  }
}
```

Note: `.react-select__multi-value__remove` was previously defined in `search-dropdown.scss` — it targets a class generated internally by the `react-select` library (not a literal `className` in our JSX), so it can never be a CSS Module and must stay global. It's moved here in this step rather than left in `search-dropdown.scss`, to keep Task 14 (search-dropdown) a pure Sass→CSS-Modules mechanical conversion with no other global side effects.

- [ ] **Step 3: Update `src/index.tsx` imports**

Replace `import "./styles.scss";` with:

```typescript
import "./styles/tokens.css";
import "./styles/global.css";
```

- [ ] **Step 4: Delete superseded files**

```bash
rm src/styles.scss
rm -r src/components/basement
```

- [ ] **Step 5: Verify**

Run: `npm run dev`. Expected: app loads with correct background color, button/form styling, and the search input boxes look unchanged (`.wine-input-container` styling intact).

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "style: add global CSS and design tokens, drop root styles.scss"
```

---

## Task 3: App.tsx

**Files:**
- Create: `src/App.module.css`
- Delete: `src/App.scss`
- Modify: `src/App.tsx`

- [ ] **Step 1: Create `src/App.module.css`**

`&`-nesting flattened; `@include for-phone-only` inlined; `@keyframes` kept as-is (CSS Modules scope keyframe names per file automatically).

```css
.App {
  min-height: 100vh;
  margin-bottom: 50px;
}

.App-logo {
  height: 130px;
}
@media (max-width: 599px) {
  .App-logo {
    height: 130px;
    width: 80vw;
  }
}

.App-header {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.app-navbar {
  display: flex;
  justify-content: center;
  font-size: 24px;
}
@media (max-width: 599px) {
  .app-navbar {
    font-size: 18px;
    flex-direction: column;
    align-items: center;
  }
}
.app-navbar a {
  margin: 0 11px;
}

.app-header-text {
  color: black;
  font-size: 60px;
}

.App-intro {
  font-size: large;
}

@keyframes App-logo-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
```

- [ ] **Step 2: Update `src/App.tsx`**

Replace the import (line 9) and JSX. Import:

```typescript
import styles from "./App.module.css";
```

JSX (lines 66-67, inside the `return`):

```tsx
      <div className={styles.App}>
        <div className={styles["App-header"]}>
          <div className="app-header-icon">
```

(`app-header-icon` is not defined in `App.scss` today either — it's a pre-existing unstyled class, left as a plain string to preserve that exact no-op behavior.)

```tsx
          <div className={styles["app-navbar"]}>
```

- [ ] **Step 3: Delete `src/App.scss`**

```bash
rm src/App.scss
```

- [ ] **Step 4: Verify**

Run: `npm run dev`. Expected: header layout, logo sizing, and nav bar look identical at both desktop and phone widths (resize browser or use devtools device toolbar below 599px).

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "style: convert App.tsx styles to CSS Modules"
```

---

## Task 4: image-uploader (CroppedImageUploader)

**Files:**
- Create: `src/components/image-uploader/styles.module.css`
- Delete: `src/components/image-uploader/styles.scss`
- Modify: `src/components/image-uploader/CroppedImageUploader.tsx`

- [ ] **Step 1: Create `src/components/image-uploader/styles.module.css`**

```css
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.file-input {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  margin: 10px 0;
}
.file-input input[type="file"] {
  display: none;
}
.file-input label {
  padding: 4px 10px;
  margin: 10px;
  border: 1px solid grey;
  cursor: pointer;
  font-size: 10px;
}

.image-preview-container {
  max-height: 500px;
  max-width: 500px;
}
@media (max-width: 599px) {
  .image-preview-container {
    max-height: 100%;
    max-width: 100%;
  }
}

.image-preview {
  height: 100%;
  width: 100%;
}
```

(Renamed from BEM (`image-uploader__container` etc.) to plain local names since CSS Modules scoping makes the `image-uploader__` prefix redundant — the module import already namespaces these. This file has exactly one consumer, so there's no cross-file reference to preserve.)

- [ ] **Step 2: Update `src/components/image-uploader/CroppedImageUploader.tsx`**

Replace imports (lines 3 and 8):

```typescript
import "react-image-crop/dist/ReactCrop.css";
```

```typescript
import styles from "./styles.module.css";
```

Replace JSX class references:
- Line 62: `<div className="image-uploader__container">` → `<div className={styles.container}>`
- Line 64: `<div className="image-uploader__file-input">` → `<div className={styles["file-input"]}>`
- Line 74: `<div className="image-uploader__image-preview-container">` → `<div className={styles["image-preview-container"]}>`
- Line 80: `className="image-uploader__image-preview"` → `className={styles["image-preview"]}`
- Line 91: `className="image-uploader__file-input"` → `className={styles["file-input"]}`

- [ ] **Step 3: Delete `src/components/image-uploader/styles.scss`**

```bash
rm src/components/image-uploader/styles.scss
```

- [ ] **Step 4: Verify**

Run: `npm run dev`, navigate to "Legg til" → click "Laste opp eget bilde?" on the wine picture field, pick a file, confirm the file picker button, crop preview box, and crop area render and look the same as before.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "style: convert image-uploader styles to CSS Modules, use react-image-crop's CSS build"
```

---

## Task 5: add-wine-form (AddWineForm)

**Files:**
- Create: `src/components/add-wine/add-wine-form.module.css`
- Delete: `src/components/add-wine/add-wine-form.scss`
- Modify: `src/components/add-wine/AddWineForm.tsx`

- [ ] **Step 1: Create `src/components/add-wine/add-wine-form.module.css`**

`.wine-picture` is dropped here — it now lives in `global.css` (Task 2) since `WineDetailsComponent.tsx` also uses it.

```css
.add-wine {
  display: flex;
  align-items: center;
  flex-direction: column;
}
.add-wine__wine-registered {
  display: flex;
  font-size: 30px;
  justify-content: center;
}

.add-wine-form {
  margin: 12px;
  box-shadow: 1px 0 2px black;
  background-color: var(--form-background-color);
  border-radius: 14px;
  width: var(--form-width);
  max-width: 900px;
}
@media (max-width: 599px) {
  .add-wine-form {
    display: grid;
    grid-template-rows: auto;
    grid-template-columns: 5% 90% 5%;
  }
}
@media (min-width: 600px) {
  .add-wine-form {
    display: grid;
    grid-template-rows: auto;
    grid-template-columns: 3% 44% 5% 44% 3%;
  }
}

@media (min-width: 600px) {
  .add-wine-form__row {
    grid-column-start: 2;
    grid-column-end: 5;
  }
}
@media (max-width: 599px) {
  .add-wine-form__row {
    grid-column-start: 2;
    grid-column-end: 3;
  }
}

@media (max-width: 599px) {
  .add-wine-form__col-1 {
    grid-column-start: 2;
    grid-column-end: 3;
  }
}
@media (min-width: 600px) {
  .add-wine-form__col-1 {
    grid-column-start: 2;
    grid-column-end: 3;
  }
}

@media (max-width: 599px) {
  .add-wine-form__col-2 {
    grid-column-start: 2;
    grid-column-end: 3;
  }
}
@media (min-width: 600px) {
  .add-wine-form__col-2 {
    grid-column-start: 4;
    grid-column-end: 5;
  }
}

.add-wine-form__fits-to-grid {
  width: 100%;
  height: 100%;
  display: inline-grid;
  grid-template-columns: 33%33%30%;
  grid-template-rows: 33%33%30%;
  margin-top: 4px;
}

.add-wine-form__fits-to-cell {
  justify-self: center;
  padding: 4px;
}

.add-wine-form__label-button-container {
  display: flex;
  flex-direction: column;
}

.add-wine-form__buttons {
  display: flex;
  justify-content: space-around;
  width: 100%;
}

.add-wine-form__button-label {
  padding: 2px 4px 0;
}

.add-wine-form__button {
  background: none;
  display: flex;
  align-items: center;
  padding: 4px 0;
}
.add-wine-form__button-add {
  grid-column-start: 1;
  font-size: 1rem;
}
.add-wine-form__button-reset {
  grid-column-start: 3;
  font-size: 1rem;
}
.add-wine-form__button--manual-reg {
  margin-top: 8px;
  font-size: 1rem;
}
.add-wine-form__button--upload {
  margin: 12px 0;
  font-size: 1rem;
}

.add-wine-error-validation {
  margin-left: 2px;
  text-decoration: underline;
  color: var(--form-error-color);
}

.form-control {
  background-color: #e8eeef !important;
}

.custom-select {
  background-color: #e8eeef !important;
}

.textfield-label {
  margin: 8px 4px;
}
```

- [ ] **Step 2: Update `src/components/add-wine/AddWineForm.tsx`**

Add import (near line 11, replacing `import "./add-wine-form.scss";`):

```typescript
import styles from "./add-wine-form.module.css";
```

Replace every class reference in the JSX (lines 133-404):

- Line 133-135:
  ```typescript
  const nameContainerWidth = selectedWine
    ? styles["add-wine-form__col-1"]
    : styles["add-wine-form__row"];
  ```
- Line 141: `<div className="add-wine">` → `<div className={styles["add-wine"]}>`
- Line 142: `<h1 className="page-title">` — unchanged (global class, stays plain string)
- Line 143: `className="add-wine-form"` → `className={styles["add-wine-form"]}`
- Line 144: `<div className={nameContainerWidth}>` — unchanged (already a variable)
- Line 145: `<div className="textfield-label">` → `<div className={styles["textfield-label"]}>` (also at lines 190, 206, 222, 241, 257, 273, 293, 312, 346 — every `textfield-label` occurrence)
- Line 161, 193, 209, 244, 260, 276, 296: `<div className="wine-input-container" ...>` — unchanged (global class)
- Line 171: `className="add-wine-form__button--manual-reg"` → `className={styles["add-wine-form__button--manual-reg"]}`
- Line 185, 200, 216, 251, 267, 285 (and its wrapper at 304), 216: `<p className="add-wine-error-validation">` → `<p className={styles["add-wine-error-validation"]}>` (every occurrence)
- Line 189: `<div className="add-wine-form__col-2">` → `<div className={styles["add-wine-form__col-2"]}>` (also lines 220, 255, 291, 343)
- Line 205: `<div className="add-wine-form__col-1">` → `<div className={styles["add-wine-form__col-1"]}>` (also lines 239, 271, 311, 240)
- Line 315: `<div className="add-wine-form__fits-to-grid">` → `<div className={styles["add-wine-form__fits-to-grid"]}>`
- Line 322: `className="add-wine-form__fits-to-cell"` → `className={styles["add-wine-form__fits-to-cell"]}`
- Line 344: `<div className="add-wine-form__col-2">` → `<div className={styles["add-wine-form__col-2"]}>`
- Line 345: `<div className="add-wine-form__label-button-container">` → `<div className={styles["add-wine-form__label-button-container"]}>`
- Line 351: `className="add-wine-form__button--upload"` → `className={styles["add-wine-form__button--upload"]}`
- Line 360: `className="wine-picture"` — unchanged (now global class from Task 2)
- Line 376, 399: `<div className="add-wine-form__row">` → `<div className={styles["add-wine-form__row"]}>`
- Line 377: `<div className="add-wine-form__buttons">` → `<div className={styles["add-wine-form__buttons"]}>`
- Line 381: `className="add-wine-form__button add-wine-form__button-add"` → `` className={`${styles["add-wine-form__button"]} ${styles["add-wine-form__button-add"]}`} ``
- Line 384, 391: `className="add-wine-form__button-label"` → `className={styles["add-wine-form__button-label"]}`
- Line 388: `className="add-wine-form__button add-wine-form__button-reset"` → `` className={`${styles["add-wine-form__button"]} ${styles["add-wine-form__button-reset"]}`} ``
- Line 400: `<div className="add-wine__wine-registered">` → `<div className={styles["add-wine__wine-registered"]}>`

- [ ] **Step 3: Delete `src/components/add-wine/add-wine-form.scss`**

```bash
rm src/components/add-wine/add-wine-form.scss
```

- [ ] **Step 4: Verify**

Run: `npm run dev`, navigate to "Legg til", search for a wine, confirm the whole form (grid layout on desktop and phone width, buttons, error text if you submit empty, wine picture) looks unchanged.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "style: convert add-wine-form styles to CSS Modules"
```

---

## Task 6: spinner (Spinner)

**Files:**
- Create: `src/components/spinner/styles.module.css`
- Delete: `src/components/spinner/styles.scss`
- Modify: `src/components/spinner/Spinner.tsx`

- [ ] **Step 1: Create `src/components/spinner/styles.module.css`**

```css
.spinner {
  margin-top: 8px;
  margin-left: 12px;
  height: 20px;
  width: 20px;
  border-left: 1px solid;
  border-right: 1px solid;
  border-bottom: 1px solid;
  border-top: none;
  border-radius: 20px;
  border-color: white;
  -webkit-animation: spin 1s infinite linear;
  animation: spin 1s infinite linear;
}
@-webkit-keyframes spin {
  from { -webkit-transform: rotate(0deg); }
  to { -webkit-transform: rotate(360deg); }
}
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.spinner--dark {
  border-color: black;
}
```

(The `@keyframes` were nested inside `.spinner` in the original Sass, which Dart Sass hoists to the top level at compile time with no scoping effect — moving them to the top level here is behavior-identical, just skipping the pointless nesting.)

- [ ] **Step 2: Update `src/components/spinner/Spinner.tsx`**

```typescript
import React from "react";
import styles from "./styles.module.css";

type Props = {
  dark?: boolean;
};
const Spinner = ({ dark = false }: Props) => {
  return (
    <div
      className={`${styles.spinner} ${dark ? styles["spinner--dark"] : ""}`}
    ></div>
  );
};

export default Spinner;
```

- [ ] **Step 3: Delete `src/components/spinner/styles.scss`**

```bash
rm src/components/spinner/styles.scss
```

- [ ] **Step 4: Verify**

Run: `npm run dev`, go to "Logg inn" and submit the form to trigger `<Spinner dark={true} />` — confirm the spinner still renders and animates with a dark border. It's also used on the wine-suggester "Henter en vin" loading state (Task 7's page) — recheck it there too once Task 7 lands.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "style: convert spinner styles to CSS Modules"
```

---

## Task 7: lookup (LookUpComponent + WineSuggesterPage)

`lookup.scss` is shared by two component trees today: `LookUpComponent.tsx` (the "Vindetaljer" search page) and `WineSuggesterPage.tsx` (the "Finn meg en vin!" page) both use `lookup-container`, `lookup-details-container`, and `wine-details-component`. Both get converted together since the module file has two real consumers.

**Files:**
- Create: `src/components/lookup/lookup.module.css`
- Delete: `src/components/lookup/lookup.scss`
- Modify: `src/components/lookup/LookUpComponent.tsx`
- Modify: `src/features/wine-suggester/WineSuggesterPage.tsx`

- [ ] **Step 1: Create `src/components/lookup/lookup.module.css`**

The `&__button` rule (`.lookup__button`) is dropped — nothing references it (confirmed via full-codebase search), it's dead CSS.

```css
.lookup-container {
  display: flex;
  align-items: center;
  flex-direction: column;
}

.lookup-details-container {
  margin: 12px;
  padding: 20px;
  box-shadow: 1px 0 2px black;
  background-color: var(--form-background-color);
  border-radius: 14px;
  min-width: 400px;
}
@media (max-width: 599px) {
  .lookup-details-container {
    min-width: 300px;
  }
}

.wine-details-component {
  display: flex;
  flex-direction: column;
  align-items: center;
}
```

- [ ] **Step 2: Update `src/components/lookup/LookUpComponent.tsx`**

Replace import (line 4):

```typescript
import styles from "./lookup.module.css";
```

Replace JSX:
- Line 23: `<div className="lookup-container">` → `<div className={styles["lookup-container"]}>`
- Line 24: `<h1 className="page-title ">` — unchanged (global class)
- Line 25: `<div className="lookup-details-container">` → `<div className={styles["lookup-details-container"]}>`
- Line 42: `<div className="wine-details-component">` → `<div className={styles["wine-details-component"]}>`
- Line 45: `className="wine-search-form__button"` — unchanged (global class, promoted in Task 2)

- [ ] **Step 3: Update `src/features/wine-suggester/WineSuggesterPage.tsx`**

Add import (near line 13):

```typescript
import styles from "../../components/lookup/lookup.module.css";
```

Replace JSX:
- Line 87: `<div className="lookup-container">` → `<div className={styles["lookup-container"]}>`
- Line 88: `<h1 className="page-title ">` — unchanged (global class)
- Line 89: `<div className="lookup-details-container">` → `<div className={styles["lookup-details-container"]}>`
- Line 99, 106, 113, 120, 127, 134, 141, 148, 155: `className="image"` — unchanged (global class, promoted in Task 2)
- Line 167: `<div className="wine-details-component">` → `<div className={styles["wine-details-component"]}>`
- Line 169: `className="wine-search-form__button"` — unchanged (global class, promoted in Task 2)

- [ ] **Step 4: Delete `src/components/lookup/lookup.scss`**

```bash
rm src/components/lookup/lookup.scss
```

- [ ] **Step 5: Verify**

Run: `npm run dev`. Check both "Søk" (LookUpComponent) and "Vinforslag" (WineSuggesterPage) — confirm page layout, the details box, and the "Søk på nytt" / reset button all look unchanged on both pages.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "style: convert lookup styles to CSS Modules"
```

---

## Task 8: winesearch + winelist (WineSearch + WineList)

`winesearch.scss` and `winelist.scss` cross-reference each other: `WineSearch.tsx` uses `wine-list__filter-container`/`wine-list__radio-group(-children)` (defined in `winelist.scss`), and `WineList.tsx` uses `wine-search__no-hits` (defined in `winesearch.scss`). Both components import both modules.

**Files:**
- Create: `src/components/search/winesearch.module.css`
- Create: `src/components/search/winelist/winelist.module.css`
- Delete: `src/components/search/winesearch.scss`
- Delete: `src/components/search/winelist/winelist.scss`
- Modify: `src/components/search/WineSearch.tsx`
- Modify: `src/components/search/winelist/WineList.tsx`

- [ ] **Step 1: Create `src/components/search/winesearch.module.css`**

`wine-search__pending-container` is dropped — nothing references it (confirmed via full-codebase search), it's dead CSS.

```css
.wine-search__container {
  display: flex;
  flex-direction: column;
}
@media (max-width: 599px) {
  .wine-search__container {
    align-items: center;
  }
}

.wine-search__no-hits {
  text-align: center;
  margin: 30px 0;
  color: white;
}

.wine-search__title {
  text-align: center;
}

.wine-search__filter-bar {
  display: flex;
  align-items: center;
  justify-content: center;
}

.wine-search__filter-icon {
  margin-left: 20px;
  padding-top: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.wine-search__filter-icon:hover {
  cursor: pointer;
}

.wine-search__paragraph {
  color: white;
  font-size: 12px;
  margin: 0;
}
```

- [ ] **Step 2: Create `src/components/search/winelist/winelist.module.css`**

```css
.wine-item-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  width: 85vw;
  margin: 0 auto;
}

.wine-list__hits-container {
  display: flex;
  align-items: center;
  justify-content: center;
}

.wine-list__hits-paragraph {
  color: white;
  font-size: 22px;
  margin-bottom: 0;
}

.wine-list__filter-container {
  background-color: var(--form-background-color);
  border-radius: 24px;
  display: flex;
  margin: 10px auto;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 60vw;
  min-width: 270px;
  max-width: 300px;
}
@media (max-width: 599px) {
  .wine-list__filter-container {
    width: 70vw;
    max-width: 300px;
  }
}

.wine-list__radio-group {
  flex-wrap: nowrap !important;
  flex-direction: row !important;
}
.wine-list__radio-group-children {
  margin-top: 0 !important;
  display: inline-flex;
}
.wine-list__radio-group-children > label {
  margin: 0 20px;
}
```

- [ ] **Step 3: Update `src/components/search/WineSearch.tsx`**

Replace import (line 4):

```typescript
import styles from "./winesearch.module.css";
import winelistStyles from "./winelist/winelist.module.css";
```

Replace JSX:
- Line 58: `<div className="wine-search__container">` → `<div className={styles["wine-search__container"]}>`
- Line 59: `<div className="wine-search__filter-bar">` → `<div className={styles["wine-search__filter-bar"]}>`
- Line 60: `<h1 className="page-title wine-search__title">` → `` <h1 className={`page-title ${styles["wine-search__title"]}`}> ``
- Line 62: `className="wine-search__filter-icon"` → `className={styles["wine-search__filter-icon"]}`
- Line 66: `<p className="wine-search__paragraph">` → `<p className={styles["wine-search__paragraph"]}>`
- Line 69: `<div className="wine-list__filter-container">` → `<div className={winelistStyles["wine-list__filter-container"]}>`
- Line 76: `className="wine-list__radio-group"` → `className={winelistStyles["wine-list__radio-group"]}`
- Line 78: `<div className="wine-list__radio-group-children">` → `<div className={winelistStyles["wine-list__radio-group-children"]}>`

- [ ] **Step 4: Update `src/components/search/winelist/WineList.tsx`**

Replace import (line 3):

```typescript
import styles from "./winelist.module.css";
import winesearchStyles from "../winesearch.module.css";
```

Replace JSX:
- Line 12: `<div className="wine-list__container">` — unchanged (dead class today, not defined in any `.scss` file; leave as a plain unscoped string to preserve the exact current no-op)
- Line 14: `<h3 className="wine-search__no-hits">` → `<h3 className={winesearchStyles["wine-search__no-hits"]}>`
- Line 18, 30, 35: `<div className="wine-list__hits-container">` → `<div className={styles["wine-list__hits-container"]}>`
- Line 19, 31: `<p className="wine-list__hits-paragraph">` → `<p className={styles["wine-list__hits-paragraph"]}>`
- Line 23, 36: `<div className="wine-item-list">` → `<div className={styles["wine-item-list"]}>`

- [ ] **Step 5: Delete superseded files**

```bash
rm src/components/search/winesearch.scss
rm src/components/search/winelist/winelist.scss
```

- [ ] **Step 6: Verify**

Run: `npm run dev`, go to "Våre viner" (search page). Confirm: title/filter bar layout, the filter icon hover cursor, the type filter radio group styling, and (with no wines matching a filter) the "Ingen viner matcher søket" no-hits message — all unchanged.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "style: convert winesearch/winelist styles to CSS Modules"
```

---

## Task 9: wine-filter-form (WineFilterForm)

**Files:**
- Create: `src/components/search/wine-filter-form/wineform.module.css`
- Delete: `src/components/search/wine-filter-form/wineform.scss`
- Modify: `src/components/search/wine-filter-form/WineFilterForm.tsx`

- [ ] **Step 1: Create `src/components/search/wine-filter-form/wineform.module.css`**

`.wine-search-form__button` is dropped — it now lives in `global.css` (Task 2). `.wine-search-form__price-text` and `.fits-to-row` are dropped — nothing references them (confirmed via full-codebase search, including `WinePriceRange.tsx`), they're dead CSS.

```css
@keyframes fade-in-native {
  from {
    opacity: 0;
    top: 1000px;
  }
  to {
    opacity: 1;
    top: 200px;
  }
}

@keyframes fade-in-tablet {
  from {
    opacity: 0;
    top: 1000px;
  }
  to {
    opacity: 1;
    top: 300px;
  }
}

@keyframes fade-in-desktop {
  from {
    opacity: 0;
    top: 1000px;
  }
  to {
    opacity: 1;
    top: 350px;
  }
}

.wine-search-form__container {
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 1;
  background-color: var(--form-background-color);
  width: 280px;
}
@media (max-width: 599px) {
  .wine-search-form__container {
    width: 100%;
    animation: fade-in-native 0.3s linear;
  }
}
@media (min-width: 600px) and (max-width: 1200px) {
  .wine-search-form__container {
    animation: fade-in-tablet 0.3s linear;
  }
}
@media (min-width: 1200px) {
  .wine-search-form__container {
    animation: fade-in-desktop 0.3s linear;
  }
}

.wine-search-form {
  display: flex;
  flex-direction: column;
  margin: 12px;
}

.wine-search-form__exit-icon {
  position: absolute;
  right: 10px;
  top: 10px;
}

.wine-search-form__buttons-container {
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
}

.wine-search-form__row {
  margin: 5px 0px;
}
@media (min-width: 600px) {
  .wine-search-form__row {
    grid-column-start: 2;
    grid-column-end: 5;
  }
}
@media (max-width: 599px) {
  .wine-search-form__row {
    grid-column-start: 2;
    grid-column-end: 3;
  }
}

.wine-search-form__fits-to-grid {
  width: 100%;
  height: 100%;
  display: inline-grid;
  grid-template-columns: 33%33%30%;
  grid-template-rows: 33%33%30%;
  margin-top: 16px;
}

.wine-search-form__range-container {
  margin: 5px 10px;
}

.label {
  margin: 10px 0 !important;
}

.fits-to-cell {
  display: flex;
  justify-content: center;
  padding: 4px;
}
```

Note: the bare `label { margin: 10px 0 !important; }` rule targeted every `<label>` element globally in the original Sass. `WineFilterForm.tsx` renders plain `<label>` elements (lines 70, 83, 95, 107, 126, 153) that relied on this. Renamed to a `.label` class here (CSS Modules doesn't scope bare element selectors — a literal `label { }` rule would leak globally exactly as before, which defeats the point of modularizing it) — see Step 2 for applying it explicitly to each `<label>`.

- [ ] **Step 2: Update `src/components/search/wine-filter-form/WineFilterForm.tsx`**

Replace import (line 2):

```typescript
import styles from "./wineform.module.css";
```

Replace JSX:
- Line 64: `<div className="wine-search-form__container">` → `<div className={styles["wine-search-form__container"]}>`
- Line 65: `<div className="wine-search-form__exit-icon">` → `<div className={styles["wine-search-form__exit-icon"]}>`
- Line 68: `<form className="wine-search-form" ...>` → `<form className={styles["wine-search-form"]} ...>`
- Line 69, 82, 94, 106, 125, 152: `<div className="wine-search-form__row">` → `<div className={styles["wine-search-form__row"]}>`
- Line 70: `<label htmlFor="wineName">Navn</label>` → `<label className={styles.label} htmlFor="wineName">Navn</label>`
- Line 71: `<div className="wine-input-container">` — unchanged (global class) (also lines throughout this file wherever `wine-input-container` appears)
- Line 83: `<label>Drue</label>` → `<label className={styles.label}>Drue</label>`
- Line 95: `<label htmlFor="country">Land</label>` → `<label className={styles.label} htmlFor="country">Land</label>`
- Line 107: `<label>Region</label>` → `<label className={styles.label}>Region</label>`
- Line 126: `<label>Hva passer vinen til?</label>` → `<label className={styles.label}>Hva passer vinen til?</label>`
- Line 127: `<div className="wine-search-form__fits-to-grid">` → `<div className={styles["wine-search-form__fits-to-grid"]}>`
- Line 133: `<div key={imageKey} className="fits-to-cell">` → `<div key={imageKey} className={styles["fits-to-cell"]}>`
- Line 153: `<label>Pris</label>` → `<label className={styles.label}>Pris</label>`
- Line 154: `<div className="wine-search-form__range-container">` → `<div className={styles["wine-search-form__range-container"]}>`
- Line 158: `<div className="wine-search-form__buttons-container">` → `<div className={styles["wine-search-form__buttons-container"]}>`
- Line 160, 167: `className="wine-search-form__button"` — unchanged (global class, promoted in Task 2)

- [ ] **Step 3: Delete `src/components/search/wine-filter-form/wineform.scss`**

```bash
rm src/components/search/wine-filter-form/wineform.scss
```

- [ ] **Step 4: Verify**

Run: `npm run dev`, go to "Våre viner" → open the filter icon to show `WineFilterForm`. Confirm the slide-in animation, label spacing (all labels should look identical to before, since `.label` now applies explicitly what the bare `label` selector used to apply implicitly), the fits-to-food icon grid, and the search/clear buttons look unchanged. Check at phone width too (animation variant changes per breakpoint).

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "style: convert wine-filter-form styles to CSS Modules"
```

---

## Task 10: image-checkbox

**Files:**
- Create: `src/components/add-wine/image-checkbox/image-checkbox.module.css`
- Delete: `src/components/add-wine/image-checkbox/image-checkbox.scss`
- Modify: `src/components/add-wine/image-checkbox/image-checkbox.tsx`

- [ ] **Step 1: Create `src/components/add-wine/image-checkbox/image-checkbox.module.css`**

`.image` is dropped — it now lives in `global.css` (Task 2). The attribute selectors (`[type=checkbox]` etc.) target DOM structure, not classes — CSS Modules only scopes `.class` selectors, so these remain global exactly as they already are today (they currently apply app-wide via the single compiled stylesheet; nothing changes).

```css
/* HIDE CHECKBOX */
[type=checkbox] {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}

/* IMAGE STYLES */
[type=checkbox] + img {
  cursor: pointer;
}

/* CHECKED STYLES */
[type=checkbox]:checked + img {
  background-color: var(--image-checkbox-checked-background-color);
  border-radius: 10%;
}
```

- [ ] **Step 2: Update `src/components/add-wine/image-checkbox/image-checkbox.tsx`**

Replace import (line 2):

```typescript
import "./image-checkbox.module.css";
```

(No `styles` object needed — this file no longer defines any class, only attribute selectors, so it's a side-effect-only import like before. Line 27's `className="image"` stays unchanged, referencing the now-global `.image` class from Task 2.)

- [ ] **Step 3: Delete `src/components/add-wine/image-checkbox/image-checkbox.scss`**

```bash
rm src/components/add-wine/image-checkbox/image-checkbox.scss
```

- [ ] **Step 4: Verify**

Run: `npm run dev`, go to "Legg til" → select a wine → confirm the "Hva passer vinen til?" food-icon checkboxes still hide their native checkbox, show a pointer cursor, and highlight with a light-blue rounded background when checked.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "style: convert image-checkbox styles to CSS Modules"
```

---

## Task 11: wine-details (WineDetailsComponent)

**Files:**
- Create: `src/components/lookup/wine-details/wine-details.module.css`
- Delete: `src/components/lookup/wine-details/wine-details.scss`
- Modify: `src/components/lookup/wine-details/WineDetailsComponent.tsx`

- [ ] **Step 1: Create `src/components/lookup/wine-details/wine-details.module.css`**

```css
.wine-details-container {
  display: grid;
  grid-template-rows: auto;
  grid-template-columns: 5% 45% 45% 5%;
}

.wine-details-row-item {
  grid-column-start: 2;
  grid-column-end: 4;
}
.wine-details-row-item p {
  color: grey;
}

.wine-details-item-col-1 {
  grid-column: 2;
}
.wine-details-item-col-1 p {
  color: grey;
}

.wine-details-item-col-2 {
  grid-column: 3;
}
.wine-details-item-col-2 p {
  color: grey;
}

.wine-details-title {
  grid-column-start: 2;
  grid-column-end: span 4;
  font-size: 20px;
}
.wine-details-title p {
  color: black;
}
```

- [ ] **Step 2: Update `src/components/lookup/wine-details/WineDetailsComponent.tsx`**

Replace import (line 3):

```typescript
import styles from "./wine-details.module.css";
```

Replace JSX:
- Line 28: `<div className="wine-details-container">` → `<div className={styles["wine-details-container"]}>`
- Line 29: `<div className="wine-details-title">` → `<div className={styles["wine-details-title"]}>`
- Line 32, 40, 72: `<div className="wine-details-item-col-1">` → `<div className={styles["wine-details-item-col-1"]}>`
- Line 36, 47, 76: `<div className="wine-details-item-col-2">` → `<div className={styles["wine-details-item-col-2"]}>`
- Line 64, 68, 80, 90: `<div className="wine-details-row-item">` → `<div className={styles["wine-details-row-item"]}>`
- Line 94: `className="wine-picture"` — unchanged (global class, promoted in Task 2)

- [ ] **Step 3: Delete `src/components/lookup/wine-details/wine-details.scss`**

```bash
rm src/components/lookup/wine-details/wine-details.scss
```

- [ ] **Step 4: Verify**

Run: `npm run dev`, go to "Søk", look up a wine, confirm the details grid (type, year, country/region, grapes, taste, smell, alcohol%, price, food pairing, picture) still lines up in the same 2-column grid as before.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "style: convert wine-details styles to CSS Modules"
```

---

## Task 12: wine-item-card (WineItemCard + WineItemCardInfoTextItem + WineItemCardSkeleton)

`wine-item-card.scss` has three consumers across two directories: `wine-item-card.tsx`, `wine-item-card-info-text-item.tsx` (same folder), and `wine-item-card-skeleton/WineItemCardSkeleton.tsx` (sibling folder, mirrors the same layout for its loading-skeleton state).

**Files:**
- Create: `src/components/search/winelist/wine-item-card/wine-item-card.module.css`
- Delete: `src/components/search/winelist/wine-item-card/wine-item-card.scss`
- Modify: `src/components/search/winelist/wine-item-card/wine-item-card.tsx`
- Modify: `src/components/search/winelist/wine-item-card/wine-item-card-info-text-item.tsx`
- Modify: `src/components/search/winelist/wine-item-card-skeleton/WineItemCardSkeleton.tsx`

- [ ] **Step 1: Create `src/components/search/winelist/wine-item-card/wine-item-card.module.css`**

`&`-nesting (including the deep `&__card-body { &-col-1 {...} }` chain) flattened to explicit selectors; `@include` mixins inlined.

```css
.wine-item-card {
  margin: 1em;
}
@media (min-width: 600px) {
  .wine-item-card {
    width: var(--wine-item-card-width__tablet_up);
  }
}
@media (max-width: 599px) {
  .wine-item-card {
    width: var(--wine-item-card-width__phone);
  }
}

.wine-item-card__card-header {
  display: flex;
  align-items: flex-end;
  text-shadow: 2px 2px black;
  font-size: 24px;
  margin-bottom: 8px;
  margin-left: 5px;
  margin-right: 5px;
  color: white;
}
@media (min-width: 600px) {
  .wine-item-card__card-header {
    min-height: 120px;
  }
}

.wine-item-card__header-paragraph {
  margin-bottom: 0px;
}

.wine-item-card__rating-number {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 45px;
  background-color: var(--form-input-color);
  box-shadow: 0px 0px 1px 1px darkslategray;
  border-radius: 24px;
  width: 100px;
  font-size: 20px;
}

.wine-item-card__rating-label {
  margin: 8px 0px 0px;
}

.wine-item-card__card-body {
  padding-top: 30px;
  border-radius: 14px;
  background-color: white;
  padding-bottom: 20px;
  width: inherit;
  min-height: 650px;
  display: grid;
  grid-template-rows: auto;
  grid-template-columns: 5% 45% 45% 5%;
}

.wine-item-card__card-body-col-1 {
  grid-column: 2;
  justify-self: center;
}

.wine-item-card__card-body-rating-col {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
}

.wine-item-card__card-body-col-2 {
  grid-column: 3;
}

.wine-item-card__card-body-row-1 {
}
@media (min-width: 600px) {
  .wine-item-card__card-body-row-1 {
    min-height: 400px;
  }
}

.wine-item-card__card-body-wine-row {
  grid-column-start: 2;
  grid-column-end: 4;
  justify-self: center;
}

.wine-item-card__card-body-line-row {
  grid-column-start: 2;
  grid-column-end: 4;
}

.wine-image {
  height: 24em;
  max-width: 124px;
}

.wine-item-card__label {
  color: black;
  margin: 0;
}
@media (max-width: 599px) {
  .wine-item-card__label {
    font-size: 18px;
  }
}

.card-header {
  background-color: var(--wine-item-card-header-background-color);
  color: var(--wine-item-card-header-text-color);
  display: flex;
  align-items: flex-end;
  font-size: 18px;
  min-height: 95px;
}
@media (max-width: 599px) {
  .card-header {
    font-size: 22px;
  }
}

.info-text-item {
  margin-bottom: 16px;
}

.info-text-item--no-margin {
  margin: 0;
}

.wine-info-text {
  color: grey;
  font-size: 1em;
  margin: 6px 0;
}
@media (max-width: 599px) {
  .wine-info-text {
    font-size: 18px !important;
    margin-bottom: 10px;
    margin-top: 0;
  }
}
.wine-info-text__rating_number {
  color: black;
  margin: 0;
}
.wine-info-text--closed {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.fits-to-image {
  height: 3em;
  margin: auto 5px;
  width: 3em;
}
```

(`.wine-item-card__card-body-row-1` has an empty base rule since the original only ever set a phone-vs-tablet media-query value with no unconditional properties — kept as an empty rule for a 1:1 structural match; safe to leave as-is.)

- [ ] **Step 2: Update `src/components/search/winelist/wine-item-card/wine-item-card.tsx`**

Replace import (line 5):

```typescript
import styles from "./wine-item-card.module.css";
```

Replace JSX:
- Line 18: `<div className="wine-item-card">` → `<div className={styles["wine-item-card"]}>`
- Line 19: `<div className="wine-item-card__card-header">` → `<div className={styles["wine-item-card__card-header"]}>`
- Line 20: `<p className="wine-item-card__header-paragraph">` → `<p className={styles["wine-item-card__header-paragraph"]}>`
- Line 22: `<div className="wine-item-card__card-body">` → `<div className={styles["wine-item-card__card-body"]}>`
- Line 23: `className="wine-item-card__card-body-col-1 wine-item-card__card-body-row-1"` → `` className={`${styles["wine-item-card__card-body-col-1"]} ${styles["wine-item-card__card-body-row-1"]}`} ``
- Line 24: `className="wine-image"` → `className={styles["wine-image"]}`
- Line 26: `className="wine-item-card__card-body-col-2 wine-item-card__card-body-row-1"` → `` className={`${styles["wine-item-card__card-body-col-2"]} ${styles["wine-item-card__card-body-row-1"]}`} ``
- Line 40, 43, 59: `<div className="wine-item-card__card-body-wine-row">` → `<div className={styles["wine-item-card__card-body-wine-row"]}>`
- Line 41, 60: `<p className="wine-item-card__label">` → `<p className={styles["wine-item-card__label"]}>`
- Line 49: `className="fits-to-image"` → `className={styles["fits-to-image"]}`
- Line 56: `<div className="wine-item-card__card-body-line-row">` → `<div className={styles["wine-item-card__card-body-line-row"]}>`
- Line 62, 70: `className="wine-item-card__card-body-col-1 wine-item-card__card-body-rating-col"` / `className="wine-item-card__card-body-col-2 wine-item-card__card-body-rating-col"` → `` className={`${styles["wine-item-card__card-body-col-1"]} ${styles["wine-item-card__card-body-rating-col"]}`} `` (and `-col-2` variant)
- Line 63, 71: `<p className="wine-item-card__rating-label">` → `<p className={styles["wine-item-card__rating-label"]}>`
- Line 64, 72: `<div className="wine-item-card__rating-number">` → `<div className={styles["wine-item-card__rating-number"]}>`
- Line 65, 73: `className="wine-info-text wine-info-text__rating_number"` → `` className={`${styles["wine-info-text"]} ${styles["wine-info-text__rating_number"]}`} ``

- [ ] **Step 3: Update `src/components/search/winelist/wine-item-card/wine-item-card-info-text-item.tsx`**

Replace import (add near top):

```typescript
import React, { useState } from "react";
import styles from "./wine-item-card.module.css";
```

Replace JSX (lines 17-27):

```tsx
  const closedOrOpen = isInfoTextOpen ? "" : styles["wine-info-text--closed"];

  const marginCss = value ? "" : styles["info-text-item--no-margin"];

  return (
    <div className={`${styles["info-text-item"]} ${marginCss}`}>
      <p className={styles["wine-item-card__label"]}>{label}</p>
      {value && (
        <p onClick={toggleOpen} className={`${styles["wine-info-text"]} ${closedOrOpen}`}>
          {value}
        </p>
      )}
    </div>
  );
```

- [ ] **Step 4: Update `src/components/search/winelist/wine-item-card-skeleton/WineItemCardSkeleton.tsx`**

Add import (near top, after existing imports):

```typescript
import styles from "../wine-item-card/wine-item-card.module.css";
```

Replace JSX:
- `<div className="wine-item-card">` → `<div className={styles["wine-item-card"]}>`
- `<div className="wine-item-card__card-header">` → `<div className={styles["wine-item-card__card-header"]}>`
- `<div className="wine-item-card__card-body">` → `<div className={styles["wine-item-card__card-body"]}>`
- both `<div className="wine-item-card__card-body-col-1 wine-item-card__card-body-row-1">` / `-col-2` → `` className={`${styles["wine-item-card__card-body-col-1"]} ${styles["wine-item-card__card-body-row-1"]}`} `` (and `-col-2` variant)
- both `<div className="wine-item-card__card-body-wine-row">` → `<div className={styles["wine-item-card__card-body-wine-row"]}>`
- both `<p className="wine-item-card__label">` → `<p className={styles["wine-item-card__label"]}>`
- `<div className="wine-item-card__card-body-line-row">` → `<div className={styles["wine-item-card__card-body-line-row"]}>`
- both `className="wine-item-card__card-body-col-1 wine-item-card__card-body-rating-col"` / `-col-2` variant → `` className={`${styles["wine-item-card__card-body-col-1"]} ${styles["wine-item-card__card-body-rating-col"]}`} `` (and `-col-2` variant)
- both `<p className="wine-item-card__rating-label">` → `<p className={styles["wine-item-card__rating-label"]}>`
- both `<div className="wine-item-card__rating-number">` → `<div className={styles["wine-item-card__rating-number"]}>`

- [ ] **Step 5: Delete `src/components/search/winelist/wine-item-card/wine-item-card.scss`**

```bash
rm src/components/search/winelist/wine-item-card/wine-item-card.scss
```

- [ ] **Step 6: Verify**

Run: `npm run dev`, go to "Våre viner". Confirm the wine card grid (header, wine photo, rating numbers, "Passer til" icons, and the collapsible info-text rows — click one to expand/collapse) looks unchanged, at both phone and tablet+ widths. Then reload the page and check the loading-skeleton state (briefly shown while wines fetch) still matches the card's layout/sizing.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "style: convert wine-item-card styles to CSS Modules"
```

---

## Task 13: login (LoginComponent)

**Files:**
- Create: `src/components/login/login.module.css`
- Delete: `src/components/login/login.scss`
- Modify: `src/components/login/LoginComponent.tsx`

- [ ] **Step 1: Create `src/components/login/login.module.css`**

```css
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.login-form-container {
  width: 400px;
  display: flex;
  flex-direction: column;
}
@media (max-width: 599px) {
  .login-form-container {
    width: var(--form-width);
  }
}

.login-button {
  margin-top: 10px;
}

.login-input {
  background-color: var(--form-input-color);
  height: 40px;
  font-size: 1em;
  padding-left: var(--input_padding);
  border-radius: 24px;
  border: 1px solid grey;
  color: hsl(0, 0%, 20%);
}

.login-title {
  margin: 20px 50px !important;
  color: var(--form-error-color) !important;
}

.login-hasError {
  margin: 5px auto;
  color: var(--form-error-color);
}

.login-spinner-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
```

- [ ] **Step 2: Update `src/components/login/LoginComponent.tsx`**

Replace import (line 3):

```typescript
import styles from "./login.module.css";
```

Replace JSX:
- Line 34: `<div className="login-container">` → `<div className={styles["login-container"]}>`
- Line 35: `<h4 className="page-title login-title">` → `` <h4 className={`page-title ${styles["login-title"]}`}> ``
- Line 38: `<form className="login-form-container" ...>` → `<form className={styles["login-form-container"]} ...>`
- Line 41: `className="login-input"` → `className={styles["login-input"]}`
- Line 45: `<button className="login-button" ...>` → `<button className={styles["login-button"]} ...>`
- Line 49: `<div className="login-spinner-container">` → `<div className={styles["login-spinner-container"]}>`
- Line 53: `<p className="login-hasError">` → `<p className={styles["login-hasError"]}>`

- [ ] **Step 3: Delete `src/components/login/login.scss`**

```bash
rm src/components/login/login.scss
```

- [ ] **Step 4: Verify**

Run: `npm run dev`, navigate to `/login` (or trigger it via a private route), confirm form layout, input styling, submit button, and (enter a wrong password) the red error message all look unchanged. Also confirm the in-progress spinner ("Logger inn...") still shows correctly (this exercises Task 6's `Spinner` too).

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "style: convert login styles to CSS Modules"
```

---

## Task 14: search-dropdown (SearchDropDown + AsyncSearchDropdown)

**Files:**
- Create: `src/components/search-dropdown/search-dropdown.module.css`
- Delete: `src/components/search-dropdown/search-dropdown.scss`
- Modify: `src/components/search-dropdown/search-dropdown.jsx`
- Modify: `src/components/search-dropdown/async-search-dropdown.jsx`

Note: Task 1 renamed `search-dropdown.js` → `search-dropdown.jsx` and `async-search-dropdown.js` → `async-search-dropdown.jsx` (content unchanged) — the installed Vite version doesn't parse JSX in plain `.js` files by default. Edit the `.jsx` files; no consumer imports needed updating for the rename since they all use extension-less bare specifiers.

Note: the original `search-dropdown.scss` also defined `.react-select__multi-value__remove`, which targets a class the `react-select` library generates internally (not something in our JSX). That rule was already moved to `global.css` in Task 2, since it can never be a CSS Module. Neither `search-dropdown.jsx` nor `async-search-dropdown.jsx` reference it directly (react-select applies it internally), so no JSX changes are needed for it here.

- [ ] **Step 1: Create `src/components/search-dropdown/search-dropdown.module.css`**

```css
.search-dropdown__select {
  width: 100%;
  background-color: #023950;
  color: #FFFFFF;
}
```

- [ ] **Step 2: Update `src/components/search-dropdown/search-dropdown.jsx`**

Replace import (line 2):

```typescript
import styles from "./search-dropdown.module.css";
```

This module's only class, `.search-dropdown__select`, isn't referenced by a literal `className` in either consumer today (confirmed via full-codebase search) — it's dead CSS, same situation as the other unused rules found during this migration. Import the module for its side effect (so the CSS ships) but no JSX change is needed. `className="react-select"` on line 18 is unchanged (global class).

- [ ] **Step 3: Update `src/components/search-dropdown/async-search-dropdown.jsx`**

Replace import (line 2):

```typescript
import "./search-dropdown.module.css";
```

- [ ] **Step 4: Delete `src/components/search-dropdown/search-dropdown.scss`**

```bash
rm src/components/search-dropdown/search-dropdown.scss
```

- [ ] **Step 5: Verify**

Run: `npm run dev`, use the wine-name search dropdown (async) on "Legg til" or "Søk", and the grape/country/region dropdowns (sync) on the filter form — confirm they still render and function, and the "remove" pill button stays hidden on multi-selects (the `.react-select__multi-value__remove { display: none !important; }` global rule from Task 2).

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "style: convert search-dropdown styles to CSS Modules"
```

---

## Task 15: Remove leftover Sass infrastructure and final verification

Every `.scss` file has now been converted or deleted. Remove the shared Sass partials (no longer imported by anything) and the `sass` package itself, then do a full walkthrough.

**Files:**
- Delete: `src/styles/variables.scss`
- Delete: `src/styles/_colors.scss`
- Delete: `src/styles/_properties.scss`
- Delete: `src/styles/mixins.scss`
- Modify: `package.json`

- [ ] **Step 1: Confirm no `.scss` files remain**

```bash
find src -iname "*.scss"
```

Expected: no output.

- [ ] **Step 2: Delete the shared Sass partials**

```bash
rm src/styles/variables.scss src/styles/_colors.scss src/styles/_properties.scss src/styles/mixins.scss
```

- [ ] **Step 3: Remove the `sass` dev dependency**

```bash
npm uninstall sass
```

- [ ] **Step 4: Full-app manual verification**

Run: `npm run dev`. Walk every route at both a phone-width (< 600px, use devtools device toolbar) and a desktop-width viewport:
- "Våre viner" (search/filter/wine list/wine cards, including the loading skeleton on a fresh reload)
- "Søk" (lookup + wine details)
- "Vinforslag" (wine suggester)
- "Legg til" (add-wine form, image uploader/cropper)
- `/login`

Confirm no visual regressions and no console errors (particularly no "undefined className" or missing-module warnings).

- [ ] **Step 5: Verify production build**

```bash
npm run build
```

Expected: exits 0, `build/` contains hashed CSS/JS assets, no Sass-related warnings in the output (since `sass` is now uninstalled and no `.scss` file references remain).

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "chore: remove Sass dependency and shared partials, migration complete"
```
