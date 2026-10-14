# State of the tree

Observed from commit `7b86c4e181e17cde4df841b8f41b2e622311511f` on `main` (`Fix all tab rendering methods for new flat data structure`) by reading the scripts and config in this repo. This file records what those files do. It is not a test result.

## Process

| Item | In the repo |
| --- | --- |
| App entry | `index.html` |
| App logic | `script.js` (`AcesApps`) |
| Data access | `database-api.js` (`DatabaseAPI`) |
| Supabase client | `supabase-config.js`, using `window.supabase` from jsDelivr |
| Styles | `styles.css` |
| npm scripts | `dev` and `start`: `python -m http.server 8000` |
| Tests | no test script, no test files |
| Env files | none |
| Deploy config | no `vercel.json`, no workflow files |
| License file | none (`package.json` has `"license": "MIT"`) |
| Router | none |

`index.html` does not include a sidebar. `styles.css` still has `.sidebar` rules. The header contains breadcrumbs, search, New Project, Import CSV, an export icon, a theme button, a settings icon, and a user avatar.

## Projects table columns the UI reads

`renderOverviewTab`, `renderPromptKitTab`, `renderSalesPreTab`, and `renderSalesPostTab` read flat fields on the project object:

- Overview: `vision`, `problem_statement`, `target_audience`, `success_metrics` (array), `requirements` (array), `architecture`, `timeline_phases` (array of `{phase, duration, status}`), `resources`
- Prompt kit: `specifications`, `acceptance_criteria` (array), `sample_data` (string, parsed as JSON when it parses), `coding_standards` (array), `api_specs` (array), `testing_strategy`, `security_requirements`
- Sales pre-launch: `executive_summary`, `market_analysis`, `value_proposition`, `features_list` (array), `pricing_model` (object), `development_timeline`, `risk_assessment`
- Sales post-launch: `demo_links` (array), `case_studies` (array of `{client, result}`), `success_metrics_achieved` (array of `{label, value, benchmark}`), `customer_testimonials` (array of `{quote, author}`), `roi_calculator` (string), `competitive_differentiation` (array), `next_steps`

Dashboard rows also use `name`, `description`, `status`, `completion_percentage`, `tech_stack`, `updated_at`, and `created_at`.

`mapCsvToProject` writes that same flat shape, plus `priority`. The database check constraints for those fields are in `supabase-schema-correct.sql`.

`getProjects` selects `*` from `projects` only. It does not query `project_files`.

## Places the scripts disagree

These are separate code paths in `script.js`. Docs that describe one path should not describe the other as the same behavior.

1. **Create.** `createNewProject` inserts nested objects `overview`, `prompt_kit`, `sales_pre_launch`, and `sales_post_launch` (camelCase keys inside those objects). Those keys are not the flat columns the tab renderers read, and they are not columns in `supabase-schema-correct.sql`. They match the column names in `supabase-schema-simple.sql` only at the top level.

2. **Save.** `saveProjectChanges` writes `project.overview`, `project.promptKit`, `project.salesPackPre`, and `project.salesPackPost`, then sends the whole project object to `DatabaseAPI.updateProject`. The tab renderers do not read `promptKit`, `salesPackPre`, or `salesPackPost`.

3. **Files list.** `renderFilesTab` reads `project.files.length`. `getProjects` does not set `files`. `DatabaseAPI.getProjectFiles` exists and is not called from `script.js`.

4. **Upload.** The class defines `handleFileUpload` twice. The later definition (the one that calls `DatabaseAPI.uploadFile`) is the one that remains on the class. That method does not check file size or MIME type. The earlier definition checks a 5MB limit and a short MIME allow-list and only pushes onto `this.currentProject.files`.

5. **Clone.** The table clone button calls `cloneProject`, which pushes a copy into `this.projects` with `id` set to `Date.now().toString()`, `status` `idea`, and `completion_percentage` `0`. It does not call `createProject`. `#cloneProjectBtn` on the detail header has no click listener.

6. **CSV files.** `parseFiles` builds file objects from `File_Names`, `File_Types`, and `File_URLs` and is never called. `Examples` is not mapped. Export does not write those columns and uses commas, not pipes. `#cancelImportBtn` has no listener. `#closeCsvModal` closes the modal.

7. **Search and status filters.** The visible table is filtered in the DOM. `DatabaseAPI.searchProjects` and `DatabaseAPI.filterProjectsByStatus` are not called.

8. **Detail delete vs table delete.** The detail Delete button confirms, then `deleteProject` confirms again. `deleteProject` calls `DatabaseAPI.deleteProject`.

## Schema files

| File | Relation to the flat fields above |
| --- | --- |
| `supabase-schema-correct.sql` | Same column names and array/JSON types the renderers and CSV mapper use. Drops both tables first. |
| `supabase-schema.sql` | Flat table, different types, column `timeline` instead of `timeline_phases`. Does not drop existing tables. |
| `supabase-schema-simple.sql` | Four JSONB blobs. Drops both tables first. |

All three enable row level security with allow-all policies and insert a public `project-files` bucket.

## Sample CSV files

`sample-projects.csv`, `test-import.csv`, and `focusflow-test.csv` are pipe-delimited and share one header row, including `Examples` and the three file columns. They are data files, not a schema.

## Tracked paths that the page does not load

- `script-backup.js`
- `.next/` (webpack client-development cache, server manifests, and `types/package.json`)
- `.DS_Store`
- `.cursor/rules/my-custom-rule.mdc` (editor rule, not loaded by the page)
