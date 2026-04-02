# AI-friendly tickets (Codex, Cursor, Linear, Figma)

Use this when writing work before it lands in Linear or before you hand it to an implementation agent. Goal: **enough detail for autonomous execution**, no guesswork about scope or acceptance.

---

## When to use

- New features, refactors, bugs, or chores that a coding agent will implement.
- Anything that might touch UI, routes, API, or data — spell it out here first.

---

## Recommended structure

Copy the template below into Linear (description) or a design doc, then trim only what is truly N/A.

### Title

- **Imperative, specific:** what ships or what gets fixed (not “Improve dashboard” — use “Add invoice PDF export on `/invoices/[id]`”).

### Summary (1–3 sentences)

- **User-visible outcome** or **system behavior** after the change.

### Goal

- Why we are doing this (business or technical “so that …”).

### Problem

- What is broken, missing, or risky today. Link errors, screenshots, or metrics if useful.

### Scope (must ship in this ticket)

- Bullet list of **concrete** work items.
- Name **routes, pages, components, or API surfaces** when known (e.g. `app/(dashboard)/invoices/page.tsx`).

### Out of scope

- What we are **not** doing — prevents scope creep and wrong assumptions.

### Acceptance criteria

- Testable statements: “When user … then …”
- Include **empty states**, **errors**, **permissions**, and **mobile** if relevant.
- For UI: reference **Figma node** or attach screenshot if no Figma.

### Data and assumptions

- Entities, fields, env vars, feature flags.
- **“Unknown” is OK** — say what must be decided vs what is assumed.

### Design references (Figma)

- File URL + **node id** (or frame name if id not handy).
- Note **responsive behavior**, **tokens**, and anything not obvious from the frame.

### Linear usage

- One ticket = one reviewable unit; split if it would be a huge PR.
- **Labels / project / priority** set so agents can filter.
- **Delegate** (Codex / Cursor) when you expect an agent to own implementation.
- Link **related issues** (blocks / blocked by) when order matters.

### Engineering notes (optional)

- Library versions, constraints, performance, or migration notes.

### Git / PR expectations (optional)

- Branch naming, or “small commits OK” / “single commit preferred”.

---

## Reusable template (copy-paste)

```markdown
## Goal
…

## Problem
…

## Scope
- …

## Out of scope
- …

## Acceptance criteria
- …

## Data / assumptions
- …

## Design (Figma)
- Link: …
- Node / frame: …

## Linear
- Project: …
- Delegate: … (if applicable)
```

---

## How tools fit together

| Tool | Role |
|------|------|
| **Linear** | Source of truth for **task state**, scope, acceptance criteria, links to PRs and design. |
| **Figma** | **Visual** source of truth for layout, spacing, and component intent. |
| **Cursor / Codex** | Implementation from repo + ticket + Figma; **ask** in the ticket when something is ambiguous instead of inventing behavior. |

**Rule of thumb:** If an agent would need to open Slack to ask a question, the ticket should answer it or explicitly say “decide X as you see fit.”

---

## Writing rules

1. **Prefer concrete nouns** (paths, endpoints, component names) over vague areas (“the settings area”).
2. **Acceptance criteria** are the contract — everything else supports them.
3. **Out of scope** is as important as scope — it reduces rework.
4. **One ticket** should be completable in a focused session or a single small PR; if not, split.

---

## Maintenance

- Update this guide when the team agrees on new patterns (e.g. testing strategy, PR size).
- Do not duplicate full product specs here — link out when needed.
