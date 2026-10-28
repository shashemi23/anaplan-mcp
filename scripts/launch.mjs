#!/usr/bin/env node
// Plugin entry point for the Anaplan MCP server.
// Plugins are installed from source, so the first launch installs dependencies
// and compiles TypeScript before starting the stdio server. All build output
// goes to stderr because stdout carries the MCP protocol.

import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const entry = join(root, "dist", "index.js");
const npm = process.platform === "win32" ? "npm.cmd" : "npm";

function run(args) {
  const result = spawnSync(npm, args, {
    cwd: root,
    stdio: ["ignore", process.stderr, process.stderr],
    shell: process.platform === "win32",
  });
  if (result.status !== 0) {
    console.error(`anaplan-mcp: "npm ${args.join(" ")}" failed (exit ${result.status ?? result.error?.message}).`);
    process.exit(1);
  }
}

if (!existsSync(entry)) {
  console.error("anaplan-mcp: first launch, installing dependencies and building...");
  if (!existsSync(join(root, "node_modules", "typescript"))) {
    run(["ci", "--no-audit", "--no-fund"]);
  }
  run(["run", "build"]);
}

await import(pathToFileURL(entry).href);
