---
description: Read data from an Anaplan module or saved view
argument-hint: "<model> <module> [view] [filters...]"
---

Read Anaplan data for: $ARGUMENTS

1. Resolve the workspace, model, and module (ask if ambiguous). Use the module ID as the
   view unless the user named a saved view (`show_savedviews`).
2. Check the layout with `show_moduledetails` or `show_viewdetails`. For page dimensions
   the user didn't filter, select the top-level "All" item rather than looping.
3. Call `read_cells` once with `pages` and, if needed, `maxRows`. If the view exceeds 1M
   cells, use the `create_view_readrequest` flow and always finish with
   `delete_view_readrequest`.
4. Present the data as a table and summarize totals or notable values.
