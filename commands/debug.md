---
description: Diagnose a failed Anaplan import, export, or process
argument-hint: "<model> <action name>"
---

Investigate why an Anaplan action failed: $ARGUMENTS

1. Resolve the workspace, model, and action. Find its type from `show_imports`,
   `show_exports`, `show_processes`, or `show_actions`.
2. Call `show_tasks` for that action type and ID; pick the latest task with
   `successful=false`.
3. For imports with `failureDumpAvailable=true`, call `download_importdump`. For processes,
   find the failed step's `objectId` in `nestedResults` and call `download_processdump`.
4. Check `show_modelstatus` in case the model was closed or busy.
5. Explain the root cause in plain terms, quote the representative error rows, and propose
   a fix. Don't re-run the action unless the user asks.
