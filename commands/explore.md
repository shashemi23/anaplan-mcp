---
description: Map the structure of an Anaplan model (modules, lists, actions)
argument-hint: "[workspace] [model]"
---

Give the user an overview of an Anaplan model using the anaplan MCP tools.

Target: $ARGUMENTS

1. If no workspace or model was given, call `show_workspaces` and `show_allmodels`, then
   ask which model to explore. If a model URL was given, take the IDs after
   `/workspaces/` and `/models/`.
2. Call `show_modelstatus`; if the model is closed, tell the user and ask before `open_model`.
3. In parallel, call `show_modules`, `show_lists`, `show_imports`, `show_exports`, and
   `show_processes`.
4. Summarize: the model's purpose as far as the names reveal it, module groups (by naming
   prefix or functional area), key lists and their hierarchy, the time and version setup
   (`show_currentperiod`, `show_versions`), and the available data actions.
5. Offer next steps, such as reading a module, tracing a list's usage, or running an export.
