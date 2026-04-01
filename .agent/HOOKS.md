# Hooks

Use hooks for small, high-ROI enforcement only.

Recommended hooks:

- `sessionStart`: load minimal repo context and note whether the task needs routing, history lookup, supervision, or delegation
- `preToolUse`: block destructive commands
- `postTask`: capture short lessons, delegated handoffs, history updates, or acceptance review updates after notable changes
- Git `commit-msg`: require `Acceptance: .agent/ACCEPTANCE.md` in the commit message
- Git `pre-commit` and `pre-push`: refresh `.agent/ACCEPTANCE.md` and block when the supervisor verdict is not approved

Rules:

- Hooks must be fast.
- Do not run long test suites in hooks.
- Prefer clear block-or-warn behavior over hidden magic.
