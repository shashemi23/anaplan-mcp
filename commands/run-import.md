---
description: Load CSV data into Anaplan through an existing import action
argument-hint: "<model> <import name> [path to CSV]"
---

Run an Anaplan import for: $ARGUMENTS

1. Resolve the workspace, model, and import (`show_imports`).
2. Call `show_importdetails` to get the expected columns and source file.
3. Get the CSV: read the file the user named, or ask for it. Check that its headers match
   the import's columns and report any mismatch before going further.
4. Tell the user which model and import will run and how many rows will load, and get
   confirmation.
5. Call `run_import` with `csvData`. Report the success, ignored, and failed counts.
6. If rows failed: `show_tasks` (actionType `imports`) → `download_importdump`, then
   summarize the row-level errors and likely fixes.
