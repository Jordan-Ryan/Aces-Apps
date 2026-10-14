# AGENTS.md

Facts for working in this repository. Behavior that the scripts disagree on is listed in `docs/STATE.md`.

## Layout

This is a static page, not a Next.js app.

- `index.html` loads Font Awesome and `@supabase/supabase-js@2` from CDNs, then imports `./script.js` once `window.supabase` exists.
- `script.js` exports class `AcesApps`. The HTML constructs it and assigns `window.app`.
- `database-api.js` exports `DatabaseAPI` and talks to Supabase.
- `supabase-config.js` exports `supabase`, `TABLES`, and `handleSupabaseError`.
- `styles.css` is the only stylesheet linked by the page.
- `script-backup.js` is not referenced by `index.html`.

`package.json` name is `aces-apps`. Scripts `dev` and `start` both run `python -m http.server 8000`. There is no `test` script, no lockfile, and no `vercel.json`.

## Run

Serve the repository root over HTTP so the ES module import works.

```bash
python3 -m http.server 8000
```

`npm run dev` runs `python -m http.server 8000`. Use that only when a `python` executable is on `PATH`. `npm install` does not change how the page loads Supabase; the script tag uses jsDelivr.

Open `http://localhost:8000`.

## Data

- Tables: `projects`, `project_files`.
- Bucket: `project-files`.
- Schema file that matches the tab renderers and `mapCsvToProject`: `supabase-schema-correct.sql`. It drops both tables before creating them.
- Credentials are the `supabaseUrl` and `supabaseKey` constants in `supabase-config.js`. The page does not read environment variables. Do not copy the key into docs, commits, or logs.

## When editing

- CSV import splits on `|`. Export joins with `,` and quotes fields. See `README.md`.
- Views change `display` on `#dashboardView` and `#projectDetailView`. There is no history routing.
- Theme state is the only `localStorage` key written by `script.js` (`theme`).
- `.next/` is tracked. `package.json` has no Next.js dependency or script. Do not treat that directory as the app.
- `.cursor/rules/my-custom-rule.mdc` is a standing project rule. It describes a sidebar, `/dashboard` and `/project/:id` routes, and tests. Those are not in `index.html` or `package.json`.

Keep `README.md`, `SUPABASE_SETUP.md`, and `docs/STATE.md` aligned with the scripts when behavior changes. Do not add readiness, launch, or quality claims to the docs.
