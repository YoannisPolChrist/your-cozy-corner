# Delegation

Use this file when the repo regularly benefits from subagents or parallel work.

## Delegate When

- the task is bounded, separable, and not the immediate blocker
- the scope is read-only exploration, isolated implementation, or verification
- the write scope is disjoint from other active work

## Keep Local When

- the very next step depends on the result
- the task is tiny, tightly coupled, or unclear
- multiple writers would collide in the same file scope

## Required Handoff

- Task and goal
- Scope and files
- Checks run or still needed
- Omitted scope or shortcuts taken
- Risks and next step

## Review Rule

- The worker may implement, but the supervisor decides whether the task is actually complete.
- A worker handoff is evidence, not approval.

## Parallel Rules

- Keep one writer per scope.
- Prefer isolated worktrees or workdirs when parallel edits matter.
- Review delegated output before merging or claiming completion.
