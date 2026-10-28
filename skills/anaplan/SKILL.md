---
name: anaplan
description: Work with Anaplan models through the anaplan MCP tools. Use when the user mentions Anaplan, a workspace or model, modules, line items, lists, saved views, imports, exports, processes, or wants to read, write, load, or export planning data.
---

# Anaplan

The `anaplan` MCP server wraps Anaplan's Integration API v2. Every tool runs as the
authenticated user, so results reflect that user's workspace access and Selective Access.

The full workflow reference is the MCP resource `anaplan://orchestration-guide`. Read it
when a task goes beyond the patterns below.

## Domain model in one paragraph

Workspaces hold models. A model holds **modules** (data grids) whose **line items** are
the measures. Modules are dimensioned by **lists** (hierarchical, each with a pre-computed
top-level "All" item), Time, and Versions. A **view** arranges those dimensions on rows,
columns, and pages; a module's default view has the same ID as the module.

## Core patterns

- **Names work.** Tools accept workspace, model, module, list, and action names as well as
  IDs, and resolve them. ID-only tools (`show_alllineitems`, `show_lineitem_dimensions`,
  `show_dimensionitems`) need the 32-char model ID from `show_models`.
- **Discover:** `show_workspaces` → `show_models` → `show_modules` / `show_lists` /
  `show_imports` / `show_exports` / `show_processes`.
- **Read data:** `read_cells` with the module as the view. Narrow with `pages` (prefer the
  "All" item over looping) or `maxRows`. Never call `read_cells` once per list item. Over
  1M cells, use `create_view_readrequest` → poll `get_view_readrequest` → fetch each page →
  `delete_view_readrequest`.
- **Export:** prefer an existing export via `run_export`; it polls and downloads for you.
- **Import:** `show_importdetails` for expected columns, then `run_import` with `csvData`.
  It uploads and runs in one call. On failure: `show_tasks` → `download_importdump`.
- **Write cells:** `write_cells` with names (`lineItemName`, `dimensionName`, `itemName`).
- **Update list items:** call `get_list_items` first; include `code` for any item that
  already has one, or Anaplan returns HTTP 500.
- **Unexpected errors:** check `show_modelstatus`; a closed model needs `open_model`.

## Safety

These change or destroy data and can't be undone: `run_delete`, `delete_list_items`,
`delete_file`, `bulk_delete_models`, `close_model`, `set_currentperiod`, `set_fiscalyear`,
`set_versionswitchover`, `reset_list_index`. Before calling one, state the exact workspace,
model, and items it will affect and get the user's confirmation. Treat `write_cells`,
`run_import`, `run_process`, and list writes the same way when the user hasn't already
asked for that exact change.

## Authentication

With OAuth (`ANAPLAN_CLIENT_ID`), the first call returns a device-login URL and code.
Show both to the user, wait for them to approve in the browser, then retry the call.
If no credentials are configured, point the user to `/anaplan:setup`.
