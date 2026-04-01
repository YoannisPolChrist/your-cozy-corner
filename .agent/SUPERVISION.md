# Supervision

Use this file when the repo should default to a supervisor-first agent workflow.

## Default Shape

- The primary agent acts as orchestrator and reviewer.
- Implementation is delegated to one or more subagents when the task is not tiny.
- Verification can be delegated, but final approval stays with the supervisor.

## Required Flow

1. Write the task contract in `.agent/TASK.md`.
2. Split the work into bounded scopes and assign one writer per scope.
3. Require each worker handoff to state:
   - goal fulfilled
   - touched files
   - checks run
   - omitted scope
   - risks or doubts
4. Review the delivered diff against the contract.
5. Record the result in `.agent/ACCEPTANCE.md`.
6. Commit or claim completion only after the supervisor marks the verdict as approved.

## Reject Conditions

- the worker solved a neighboring problem instead of the requested one
- requested files or flows are still untouched without explanation
- checks are missing for a risky change
- the handoff is vague about what was skipped
- the diff contains unrelated drive-by edits
