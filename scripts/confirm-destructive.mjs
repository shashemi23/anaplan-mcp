#!/usr/bin/env node
// PreToolUse hook: forces a permission prompt for destructive Anaplan tools,
// even when the session would otherwise auto-approve them.

let input = "";
for await (const chunk of process.stdin) input += chunk;

let tool = "this Anaplan action";
try {
  const name = JSON.parse(input).tool_name ?? "";
  tool = name.split("__").pop() || tool;
} catch {
  // Fall through with the generic name.
}

process.stdout.write(
  JSON.stringify({
    hookSpecificOutput: {
      hookEventName: "PreToolUse",
      permissionDecision: "ask",
      permissionDecisionReason: `${tool} changes or deletes Anaplan data and cannot be undone. Confirm the target workspace, model, and items before approving.`,
    },
  })
);
