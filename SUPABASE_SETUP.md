# Supabase setup

The page reads `supabaseUrl` and `supabaseKey` from `supabase-config.js`. It does not read `SUPABASE_URL`, `SUPABASE_ANON_KEY`, or any other environment variable.

## 1. Create a project

1. Create a project in the Supabase dashboard.
2. In **Project Settings → API**, copy the project URL and the anon public key.
3. Set those values in `supabase-config.js`:

```javascript
const supabaseUrl = 'https://your-project-id.supabase.co';
const supabaseKey = 'your-anon-key';
```

The checked-in file already assigns both constants. Replace them to use a different project. Do not commit a new key into docs or logs.

## 2. Create the tables

In the Supabase SQL editor, run `supabase-schema-correct.sql`.

That script:

- drops `project_files` and `projects` if they exist, then creates them again
- adds checks for `status` (`current`, `completed`, `idea`), `completion_percentage` (0–100), and `priority` (`low`, `medium`, `high`)
- enables row level security and creates policies that allow all operations
- creates `update_updated_at_column` and a trigger on `projects`
- inserts a public storage bucket named `project-files` and a storage policy for that bucket

Running it removes existing rows in those two tables.

`database-api.js` uses the table names `projects` and `project_files` and the bucket name `project-files`.

### Which schema file

Use `supabase-schema-correct.sql` for this page. `script.js` tab renderers and `mapCsvToProject` use its flat columns, including `timeline_phases`, `success_metrics` and `requirements` as text arrays, `sample_data` as text, and `roi_calculator` as text.

The other two files in the repo are different:

| File | Shape |
| --- | --- |
| `supabase-schema.sql` | Flat columns, with `timeline` instead of `timeline_phases`, and several fields typed as `JSONB` or plain `TEXT` where the correct file uses arrays |
| `supabase-schema-simple.sql` | Nested `JSONB` columns `overview`, `prompt_kit`, `sales_pre_launch`, and `sales_post_launch` |

## 3. Storage bucket

After the SQL runs, **Storage** should list a public bucket named `project-files`. The insert uses `ON CONFLICT (id) DO NOTHING`, so an existing bucket with that id is left as it is.

`DatabaseAPI.uploadFile` uploads to `project-files` at `{projectId}/{timestamp}.{ext}` and stores `name`, `type`, `size`, `url`, and `storage_path` on `project_files`.

## 4. Load the page

Serve the repo and open the site as described in `README.md`. On startup, `AcesApps.loadProjects` calls `DatabaseAPI.getProjects()`. A failure is logged as `Supabase fetch projects error` and the in-memory list is set to `[]`.

Browser checks when a request fails:

- the URL and anon key in `supabase-config.js`
- whether `supabase-schema-correct.sql` has been applied
- the console and the network call to the Supabase REST API
- that `https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2` loaded, because `supabase-config.js` throws if `window.supabase` is missing

## Policies

Row level security is on. The policies in `supabase-schema-correct.sql` use `USING (true)` for all commands on `projects`, `project_files`, and objects in the `project-files` bucket. The bucket is created with `public` set to true. The client uses the anon key.
