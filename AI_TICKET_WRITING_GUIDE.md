# AI Ticket-Writing Guide (Codex + Cursor + Linear + Figma)

## Purpose

Use this guide to write implementation tickets that AI agents can execute with high autonomy and low ambiguity.

This is the source-of-truth format for new product and engineering work sent to Linear and then implemented by Codex/Cursor agents.

---

## Core Principles

1. **Outcome first:** State the user/business outcome before technical details.
2. **Bounded scope:** Clearly separate what is in scope vs out of scope.
3. **Testable requirements:** Write acceptance criteria that can be objectively checked.
4. **Concrete references:** Link exact Figma frames, states, and flows (not just a file home page).
5. **Execution-ready context:** Include routes/surfaces, data assumptions, dependencies, and constraints.
6. **Single ticket = single coherent change:** Avoid mixing unrelated work in one issue.

---

## Required Ticket Structure

Every ticket must include all sections below.

### 1) Title
- Use a clear action + surface + objective.
- Good: `Add password reset confirmation state to /login flow`
- Avoid vague titles like `Fix auth stuff`.

### 2) Goal
- 1-3 sentences describing the intended outcome.
- Focus on user impact or product impact.

### 3) Problem / Context
- Describe current behavior and why it is insufficient.
- Include relevant background, constraints, or prior decisions.

### 4) Scope
- List what must be implemented in this ticket.
- Prefer bullet points.

### 5) Out of Scope
- Explicitly list what should not be implemented.
- Prevents accidental expansion by implementation agents.

### 6) Routes / Surfaces Affected
- Specify where changes apply:
  - App routes (e.g. `/dashboard`, `/settings/billing`)
  - Components/screens
  - Device/platform variants (web/mobile, responsive breakpoints)
  - Auth roles/permissions if relevant

### 7) Functional Requirements
- Describe behavior in concrete terms.
- Include state-level details:
  - Loading, empty, error, success
  - Validation rules
  - Edge cases and fallback behavior

### 8) Data & Technical Assumptions
- Document assumptions that influence implementation:
  - APIs used or added
  - Request/response shape assumptions
  - Database/model changes
  - Feature flags
  - Analytics/events
  - Permissions/security constraints

If something is unknown, call it out explicitly as an open question.

### 9) Design References (Figma)
- Provide direct links to **exact frames** and interaction flows.
- Include enough detail so an agent can map design to behavior:
  - Frame links for default/loading/error/success states
  - Notes on spacing, copy, interactions, and responsive behavior
  - Any intentional deviations from design
- If Figma and ticket text conflict, the ticket must state which source is authoritative.

### 10) Acceptance Criteria
- Write criteria that are objective and verifiable.
- Prefer checklist format and specific outcomes.
- Good pattern:
  - Given [context], when [action], then [result]
  - Include non-happy paths (errors, retries, permissions)

### 11) Validation / QA Notes
- Define how to verify the outcome:
  - Manual test steps
  - Unit/integration/e2e expectations
  - Browser/device coverage if relevant

### 12) Dependencies / Links
- Link related Linear tickets, PRs, docs, or external constraints.

---

## Writing Rules (Do / Don't)

### Do
- Be specific with nouns, routes, components, and states.
- Use short bullets and operational language.
- Include concrete examples when requirements are subtle.
- Call out assumptions and unknowns explicitly.

### Don't
- Don't rely on implied context ("same as before", "usual behavior").
- Don't mix requirements and optional ideas in the same bullet.
- Don't leave acceptance criteria at "works as expected".
- Don't paste broad design links without frame-level references.

---

## How Linear, Figma, Codex, and Cursor Work Together

1. **Product/Engineering author ticket in Linear** using this structure.
2. **Attach Figma frame links** and state mappings for all required UI states.
3. **Mark scope boundaries** (in scope/out of scope) before assigning to an agent.
4. **Implementation agent (Codex/Cursor)** executes against ticket + references.
5. **Agent validates acceptance criteria** and reports any unresolved ambiguity.
6. **If ambiguity is blocking**, update the Linear ticket (not ad-hoc chat only) so the issue remains the source of truth.

---

## Reusable Ticket Template

Copy/paste this into a new Linear issue:

```md
## Title
[Action + surface + objective]

## Goal
[1-3 sentences: user/business outcome]

## Problem / Context
- [Current behavior]
- [Why this is a problem]
- [Relevant background/constraints]

## Scope
- [Required change 1]
- [Required change 2]
- [Required change 3]

## Out of Scope
- [Explicit non-goal 1]
- [Explicit non-goal 2]

## Routes / Surfaces Affected
- Routes: [`/example`]
- Screens/components: [list]
- Roles/platforms: [if applicable]

## Functional Requirements
- [Behavior requirement 1]
- [Behavior requirement 2]
- States:
  - Loading: [...]
  - Empty: [...]
  - Error: [...]
  - Success: [...]
- Edge cases:
  - [...]

## Data & Technical Assumptions
- APIs: [...]
- Data model/storage: [...]
- Feature flags: [...]
- Analytics/events: [...]
- Security/permissions: [...]
- Open questions: [...]

## Design References (Figma)
- Primary flow: [direct frame URL]
- Loading state: [direct frame URL]
- Error state: [direct frame URL]
- Responsive/mobile variant: [direct frame URL]
- Notes/deviations: [...]
- Source of truth in case of conflict: [Ticket text or Figma]

## Acceptance Criteria
- [ ] Given [...], when [...], then [...]
- [ ] Given [...], when [...], then [...]
- [ ] Error and edge-case behavior matches definitions above
- [ ] Scope is limited to this ticket's in-scope section

## Validation / QA Notes
- Manual checks:
  1. [...]
  2. [...]
- Automated tests:
  - Unit: [...]
  - Integration/E2E: [...]

## Dependencies / Links
- Related Linear issues: [...]
- Related docs/PRs: [...]
```

---

## Definition of a "Good AI Ticket"

A ticket is ready for autonomous execution when:

- Scope and non-scope are explicit
- Required behavior is defined at state level
- Acceptance criteria are testable
- Figma references are frame-specific
- Data/technical assumptions are stated
- Unknowns are listed as explicit questions

If any item above is missing, the ticket should be clarified before implementation.
