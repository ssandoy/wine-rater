# CRA → Vite + Sass → CSS Modules migration

## Motivation

The app runs on `react-scripts@3.4.1` (CRA 3), which is unmaintained and increasingly
brittle on current Node (installed React is 16.14.0 on Node v22). Vite replaces the
build tool with a modern, actively maintained dev server/bundler. Alongside the build
tool swap, styling moves from global Sass (`node-sass`, `.scss`) to CSS Modules with
plain CSS, removing the deprecated `node-sass` dependency and giving components
locally-scoped class names instead of hand-namespaced global BEM classes.

These are two independent subsystems bundled into one spec at the user's request, to be
implemented together on `feature/vite-migration`.

## Part 1 — Vite build tool

### Dev server & config

New `vite.config.ts`:
- `@vitejs/plugin-react` (esbuild automatic JSX runtime — compatible with the installed
  React 16.14.0, no JSX-related code changes needed).
- `server.port: 3000` (keep CRA's port).
- `resolve.alias: { src: path.resolve(__dirname, "src") }` — replaces tsconfig's
  `baseUrl: "src"` so bare imports like `import App from "App"` keep resolving at
  runtime (esbuild/Vite does not read tsconfig `baseUrl`).
- `server.proxy: { "/wine-api": { target: "http://localhost:9000", changeOrigin: true } }`
  — replaces `src/setupProxy.js` (`http-proxy-middleware` becomes a direct dependency of
  Vite's config instead of a package we manage).
- `build.outDir: "build"` — matches `netlify.toml`'s `publish = "build"`.

`src/setupProxy.js` is deleted once the proxy is expressed in `vite.config.ts`.

### index.html

Vite requires `index.html` at the project root (not `public/`), and loads the app via a
`<script type="module">` tag rather than an injected bundle.

- Move `public/index.html` → `./index.html`.
- Add `<script type="module" src="/src/index.tsx"></script>` before `</body>`.
- Replace every `%PUBLIC_URL%/...` reference with a root-relative path (`/favicon.ico`,
  `/manifest.json`, `/images/wine-logo-apple.png`) — Vite serves everything in `public/`
  at `/` directly, no templating needed.
- Remove the CRA comment block explaining `%PUBLIC_URL%`.

### Environment variables

Vite only exposes env vars prefixed `VITE_` to client code, via `import.meta.env`
instead of `process.env`.

`src/firebase/firebase-setup.ts`: rename each key and switch the access pattern:

| Before | After |
|---|---|
| `process.env.REACT_APP_API_KEY` | `import.meta.env.VITE_API_KEY` |
| `process.env.REACT_APP_AUTH_DOMAIN` | `import.meta.env.VITE_AUTH_DOMAIN` |
| `process.env.REACT_APP_DATABASE_URL` | `import.meta.env.VITE_DATABASE_URL` |
| `process.env.REACT_APP_PROJECT_ID` | `import.meta.env.VITE_PROJECT_ID` |
| `process.env.REACT_APP_STORAGE_BUCKET` | `import.meta.env.VITE_STORAGE_BUCKET` |
| `process.env.REACT_APP_MESSAGING_SENDER_ID` | `import.meta.env.VITE_MESSAGING_SENDER_ID` |
| `process.env.REACT_APP_APP_ID` | `import.meta.env.VITE_APP_ID` |

No `.env` file exists in the repo — these are set in the Netlify dashboard. The
equivalent `VITE_*` names need to be added there (and the old `REACT_APP_*` ones
removed) before/at the point this deploys; this is called out again in the rollout
section since it's an action outside the repo.

### TypeScript

- `src/react-app-env.d.ts`: replace `/// <reference types="react-scripts" />` with
  `/// <reference types="vite/client" />` (provides `import.meta.env` typing and Vite's
  asset-import types).
- `tsconfig.json`: set `"moduleResolution": "bundler"`, add `"types": ["vite/client"]`.
  Leave `target` as-is (es5) — not a blocker for Vite, not part of this migration's
  purpose.

### Scripts & dependencies

`package.json`:
- `"start"` → `"dev": "concurrently \"vite\" \"npm run start-server\""`
- `"build": "concurrently \"vite build\" \"npm run build-server\""`
- Remove: `"test"`, `"eject"` scripts (react-scripts test is unused — no test files
  exist in the repo today).
- Remove dependencies: `react-scripts`, `case-sensitive-paths-webpack-plugin`,
  `http-proxy-middleware`.
- Remove the CRA `"browserslist"` block (not read by Vite/esbuild).
- Add devDependencies: `vite`, `@vitejs/plugin-react`.

## Part 2 — Sass → CSS Modules + plain CSS

### Target architecture

Three destinations for existing styles:

1. **`src/styles/global.css`** (plain CSS, imported once from `src/index.tsx`, never a
   module) — tag selectors and utility classes referenced by bare string `className` in
   more than one component: `body`, `button`, `form` element styles, `@font-face`,
   `.error`, `.page-title`, `.wine-input-container`, `.react-select`. These can't be CSS
   Modules because unrelated components reference them by plain string today and would
   need a shared import otherwise — kept global by design, matching current behavior.

2. **`src/styles/tokens.css`** (plain CSS, imported once globally) — replaces
   `_colors.scss` and `_properties.scss` with `:root` custom properties:
   `--form-text-color`, `--base-background-color`, `--form-background-color`,
   `--form-input-color`, `--form-error-color`, `--header-background-color`,
   `--wine-item-card-header-background-color`, `--wine-item-card-header-text-color`,
   `--image-checkbox-checked-background-color`, `--button-reset-color`,
   `--button-confirm-color`, `--button-text-color`, `--wine-item-card-width__phone`,
   `--wine-item-card-width__tablet_up`, `--input-padding`, `--form-width`. Usages
   (`$form-input-color` etc.) become `var(--form-input-color)`.

3. **Per-component `*.module.css`** — the remaining 16 style files, each renamed
   alongside its component and imported as `import styles from "./x.module.css"`:

   | Current file | Consuming component(s) |
   |---|---|
   | `App.scss` | `App.tsx` |
   | `components/image-uploader/styles.scss` | `CroppedImageUploader.tsx` |
   | `components/add-wine/add-wine-form.scss` | `AddWineForm.tsx` |
   | `components/add-wine/image-checkbox/image-checkbox.scss` | `image-checkbox.tsx` |
   | `components/lookup/lookup.scss` | `LookUpComponent.tsx` |
   | `components/search/winesearch.scss` | `WineSearch.tsx` |
   | `components/search/winelist/winelist.scss` | `WineList.tsx` |
   | `components/search/winelist/wine-item-card/wine-item-card.scss` | `wine-item-card.tsx` **and** `wine-item-card-info-text-item.tsx` (both import the same module file) |
   | `components/search/wine-filter-form/wineform.scss` | `WineFilterForm.tsx` |
   | `components/login/login.scss` | `LoginComponent.tsx` |
   | `components/lookup/wine-details/wine-details.scss` | `WineDetailsComponent.tsx` |
   | `components/spinner/styles.scss` | `Spinner.tsx` |
   | `components/search-dropdown/search-dropdown.scss` | `search-dropdown.js`, `async-search-dropdown.js` (shared, same as above) |

   `components/basement/styles.scss` is not imported by any component — `basement` only
   appears elsewhere as an unrelated Firebase index name in `src/firebase/indices.ts`.
   This file is dead CSS and is deleted rather than migrated.

   `components/image-uploader/styles.scss` also currently sits alongside a *separate*
   direct import of the third-party `react-image-crop/lib/ReactCrop.scss` in the same
   file (`CroppedImageUploader.tsx`) — see below.

### Mechanical conversions required in every moved file

- **Flatten `&`-nesting.** SCSS parent-selector nesting (`&__card-header`, `&--closed`,
  `&-col-1`, etc.) has no plain-CSS equivalent — every nested rule becomes an explicit
  flat class, e.g. `.wine-item-card__card-header { ... }`. `wine-item-card.scss` is the
  deepest case (~15 nested rules, 3 levels).
- **Inline breakpoint mixins.** `mixins.scss`'s four mixins (`for-phone-only`,
  `for-tablet-portrait-up`, `for-tablet`, `for-desktop`) have 29 call sites across 11
  files. Each `@include for-x { ... }` becomes the mixin's raw `@media (...) { ... }`
  written out directly (mixins.scss itself is deleted — plain CSS has no macro
  mechanism, so the four media-query strings are just repeated at each site):
  - `for-phone-only` → `@media (max-width: 599px)`
  - `for-tablet-portrait-up` → `@media (min-width: 600px)`
  - `for-tablet` → `@media (min-width: 600px) and (max-width: 1200px)`
  - `for-desktop` → `@media (min-width: 1200px)`
- **`@keyframes`** (in `App.scss`, `spinner/styles.scss`, `wineform.scss`) move as-is
  into their component's `.module.css` — Vite's CSS Modules scope keyframe names per
  file automatically, so no manual renaming needed.

### Component updates

Every `.tsx`/`.js` file that references these classes by plain string switches to the
imported `styles` object. Hyphenated/BEM names use bracket notation:

```tsx
// before
<div className={`spinner ${dark ? "spinner--dark" : ""}`}></div>
// after
<div className={`${styles.spinner} ${dark ? styles["spinner--dark"] : ""}`}></div>
```

```tsx
// before
<h1 className="page-title wine-search__title">Lagrede viner</h1>
// after (page-title is global, wine-search__title is scoped)
<h1 className={`page-title ${styles["wine-search__title"]}`}>Lagrede viner</h1>
```

No new dependency (e.g. `classnames`/`clsx`) — template literals match the existing
pattern and are sufficient for this codebase's usage (no case has more than 2-3
conditional classes).

Files needing this treatment: `App.tsx`, `CroppedImageUploader.tsx`,
`image-checkbox.tsx`, `LookUpComponent.tsx`, `WineSearch.tsx`, `WineList.tsx`,
`wine-item-card.tsx`, `wine-item-card-info-text-item.tsx`, `WineFilterForm.tsx`,
`LoginComponent.tsx`, `WineDetailsComponent.tsx`, `Spinner.tsx`, `search-dropdown.js`,
`async-search-dropdown.js`, `AddWineForm.tsx`, `WineSuggesterPage.tsx` (uses the global
`page-title` class only, no module import needed there).

### Third-party CSS (react-image-crop)

`CroppedImageUploader.tsx` imports `react-image-crop/lib/ReactCrop.scss` directly from
the installed package. The package ships a prebuilt `dist/ReactCrop.css`
(`node_modules/react-image-crop/package.json` `"style"` field), so this import switches
to `react-image-crop/dist/ReactCrop.css`. This removes the last reason this project
would need a Sass compiler at all — no `sass` dependency is added anywhere.

## Testing / verification

No automated tests exist today, so verification is manual, per `superpowers:verify` /
`run` conventions:
- `npm run dev` — confirm the app boots on `localhost:3000`, the `/wine-api` proxy
  reaches the local netlify function, and Firebase auth/config loads (validates the
  `VITE_*` env var rename).
- Walk each route/page (search, wine details, add-wine form + image cropper, login,
  wine suggester) and visually compare against current styling — this is the main risk
  area given the manual nesting-flatten/mixin-inline conversion.
- Check both a phone-width and tablet/desktop-width viewport per page, since the
  breakpoint mixins are being hand-inlined.
- `npm run build` — confirm a production build succeeds and `netlify.toml`'s
  `publish = "build"` still finds the output.

## Rollout

- Netlify dashboard: add `VITE_API_KEY`, `VITE_AUTH_DOMAIN`, `VITE_DATABASE_URL`,
  `VITE_PROJECT_ID`, `VITE_STORAGE_BUCKET`, `VITE_MESSAGING_SENDER_ID`, `VITE_APP_ID`
  (values copied from the existing `REACT_APP_*` ones); remove the old `REACT_APP_*`
  vars once the new build is confirmed working. This must happen before/at deploy of
  this branch, not before — the old build still needs `REACT_APP_*` until cutover.
- `npm run build`'s command in `netlify.toml` (`command = "npm run build"`) stays
  unchanged; only what `build` does internally changes.

## Out of scope

React version bump, ESLint config changes, netlify-lambda/functions functional changes,
Material-UI/Emotion usage, `react-select`/`rc-slider` internal styling, adding test
tooling.

Exception found during Task 1 review: `netlify-lambda build` was discovered to fail on
Node 22 with `ERR_OSSL_EVP_UNSUPPORTED` (webpack 4's legacy OpenSSL API usage) —
reproduced identically on the pre-migration codebase, so it isn't caused by this
migration, but since `npm run build` must exit 0 end-to-end, this narrow fix (prefixing
the `build-server` script with `NODE_OPTIONS=--openssl-legacy-provider`) was brought
in scope. No other netlify-lambda/functions changes are made.
