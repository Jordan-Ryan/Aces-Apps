# Aces Apps

Static single-page app for listing prompt-engineering projects and opening a tabbed detail view. The browser entry is `index.html`. Project rows are loaded from Supabase.

## Run locally

The page loads `script.js` as an ES module, so open it through an HTTP server. A `file://` URL will not load the module.

`package.json` defines both `dev` and `start` as:

```bash
python -m http.server 8000
```

```bash
npm run dev
```

If `python` is not on `PATH`, run the same server with:

```bash
python3 -m http.server 8000
```

Then open [http://localhost:8000](http://localhost:8000).

`npm install` is not required to serve the page. `index.html` loads `@supabase/supabase-js` from jsDelivr (`@supabase/supabase-js@2`). `package.json` lists that package as a dependency, and the page does not import it from `node_modules`. There is no lockfile in the repo.

## Supabase

`supabase-config.js` sets `supabaseUrl` and `supabaseKey` in source and creates the client from `window.supabase`. The page does not read environment variables. There is no `.env` file and no `vercel.json` in the repo.

To point the page at a project, edit those two constants. The browser must be able to load the CDN script before `script.js` runs; `index.html` retries until `window.supabase` exists.

Table and bucket names used by `database-api.js`:

- table `projects`
- table `project_files`
- storage bucket `project-files`

The tab renderers in `script.js` and `mapCsvToProject` read and write flat columns. Those names and types match `supabase-schema-correct.sql`. Run that file in the Supabase SQL editor when creating a database for this page. It drops and recreates `projects` and `project_files`, enables row level security, adds policies that allow all operations, and inserts a public `project-files` bucket.

`supabase-schema.sql` and `supabase-schema-simple.sql` describe different column shapes. See `docs/STATE.md`. Setup steps are also in `SUPABASE_SETUP.md`.

`package.json` sets `"license": "MIT"`. This repo has no `LICENSE` file.

## What the page does

`AcesApps` in `script.js` loads every row from `projects` on startup (`select('*')`, ordered by `updated_at` descending).

The dashboard table shows name, description, status, completion percentage, the first two `tech_stack` entries, and the last modified time. Header controls:

- **New Project** prompts for a name and calls `DatabaseAPI.createProject` with the object built in `createNewProject`. That object is nested; the tabs read flat columns. See `docs/STATE.md`.
- **Import CSV** opens a modal. The parser splits each line on `|`.
- **Export** (the download icon) downloads a comma-separated file.
- Search hides table rows whose name and description do not contain the query. It does not call `DatabaseAPI.searchProjects`.
- Status buttons **All**, **Current**, **Completed**, and **Ideas** hide rows in the table. They do not call `DatabaseAPI.filterProjectsByStatus`.
- The theme button sets `data-theme` to `light` or `dark` and stores the value in `localStorage` under the key `theme`. The default is `light`.
- Settings and the user avatar show an `alert` and do not open a panel.

Opening a project switches the main area to the detail view. Tabs are Overview, Prompt Kit, Sales Pre-Launch, Sales Post-Launch, and Files. The breadcrumb is text in the header. The address bar does not change; there is no `/dashboard` or `/project/:id` route.

Row actions call view, edit, clone, and delete. Delete removes the row through `DatabaseAPI.deleteProject`. Clone copies the object in memory only (`cloneProject` does not call `createProject`). The Clone button on the detail header (`#cloneProjectBtn`) has no listener.

Edit mode makes the detail fields editable. Saving calls `DatabaseAPI.updateProject` with the in-memory project object. See `docs/STATE.md` for how that object differs from the flat columns the tabs read.

## CSV

Import expects a header row and at least one data row, separated by `|`. `mapCsvToProject` requires `Project_Name` and `Status`. A row whose name matches a project already loaded is skipped. Status and priority are lowercased. List fields split on `;` when that character is present, otherwise on `,`. `<br>` tags in text fields become newlines.

Sample files in the repo use that header: `sample-projects.csv`, `test-import.csv`, and `focusflow-test.csv`.

`Examples`, `File_Names`, `File_Types`, and `File_URLs` are not copied onto the inserted project. `parseFiles` is defined in `mapCsvToProject` and is not called.

Export writes a quoted comma-separated file named `projects-export-YYYY-MM-DD.csv`. It is not pipe-delimited, and it omits the Examples and file columns.

## Files in this repo

```
index.html
styles.css
script.js
script-backup.js          # not referenced by index.html
database-api.js
supabase-config.js
supabase-schema-correct.sql
supabase-schema.sql
supabase-schema-simple.sql
package.json
sample-projects.csv
test-import.csv
focusflow-test.csv
README.md
SUPABASE_SETUP.md
AGENTS.md
docs/STATE.md
```

`script-backup.js` is not loaded. `.next/` is tracked and is not used by `package.json`.
