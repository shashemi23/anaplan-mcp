---
description: Check the Anaplan plugin's connection and explain how to configure credentials
---

Help the user get the Anaplan plugin connected.

1. Run `node --version`. The server needs Node.js 18 or newer.
2. Check which auth variables are set without printing secret values:
   `for v in ANAPLAN_CLIENT_ID ANAPLAN_REFRESH_TOKEN ANAPLAN_CERTIFICATE_PATH ANAPLAN_PRIVATE_KEY_PATH ANAPLAN_USERNAME ANAPLAN_PASSWORD; do [ -n "$(printenv $v)" ] && echo "$v=set" || echo "$v=unset"; done`
3. Call the `show_currentuser` tool from the anaplan MCP server.
   - If it returns a device-login URL and code, show them and ask the user to approve, then call it again.
   - If it succeeds, report who is signed in and suggest `/anaplan:explore`.
4. If nothing is configured or auth fails, explain the options. Auth is chosen in this
   priority order, so set only one:
   - **OAuth device grant (recommended):** `export ANAPLAN_CLIENT_ID=...`
     (optionally `ANAPLAN_REFRESH_TOKEN` to skip re-login after restarts).
   - **Certificate:** `ANAPLAN_CERTIFICATE_PATH` and `ANAPLAN_PRIVATE_KEY_PATH` (PEM files),
     optional `ANAPLAN_CERTIFICATE_ENCODED_DATA_FORMAT` (`v2` default, `v1` for legacy tenants).
   - **Basic:** `ANAPLAN_USERNAME` and `ANAPLAN_PASSWORD`.

   Variables must be set in the shell that launches Claude Code (or under `env` in
   `~/.claude/settings.json`). Restart Claude Code after changing them.
