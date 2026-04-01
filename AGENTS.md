# AGENTS.md

## Purpose

This file gives coding agents the minimal repo context they need.

## Priority

- Follow platform and system rules first.
- Then follow this repo file.
- Then follow task-specific instructions.
- Name conflicts instead of guessing.

## Working Mode

- Understand the existing structure first.
- Respect existing patterns and conventions.
- Prefer small, safe, additive changes.
- Do not silently refactor or restructure.
- Read only the files that matter.

## Skill Routing

- Choose a primary skill before implementation when the task spans multiple domains or phases.
- Use `codex-wide-router` when the right skill is not obvious.
- Add no more than two secondary skills, and only when they change execution or verification.
- Once routed, execute without turning the routing step into a separate mini-project.

## Repo Rules

- Critical flows:
- No-gos:
- Preferred conventions:
- Architecture notes:

## Standard Commands

- Setup:
- Dev:
- Test:
- Lint:
- Build:

## Definition of Done

- The change matches existing patterns.
- Relevant checks ran, or missing checks are called out.
- Key risks and assumptions are named briefly.
- A supervisor review exists in `.agent/ACCEPTANCE.md` before claiming completion or committing the final change.

## Change History

- Keep repo-local change history in `.agent/HISTORY.md`.
- Consult Git plus `.agent/HISTORY.md` when the task depends on what changed, what stayed untouched, or when a behavior last moved.
- Refresh `.agent/HISTORY.md` after notable merges, migrations, or cross-cutting refactors.

## Supervisor Model

- Treat the user-facing primary agent as the supervisor for non-trivial work.
- Prefer delegated implementation and verification sidecars over single-agent self-certification.
- Require the supervisor to compare `.agent/TASK.md`, `.agent/HANDOFF.md`, the diff, and checks before approving the result in `.agent/ACCEPTANCE.md`.
- Do not let the implementing agent be the only source of truth for whether the task is done.

## Subagents

- Delegate bounded exploration, isolated file scopes, or verification sidecars when the work is clearly separable.
- Keep immediate blocking work local only when delegation would slow the critical path.
- Prefer isolated scope or worktree when parallel edits matter.
- Return a short handoff that covers task, files, checks, omitted scope, and risks.
