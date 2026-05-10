# Agents

Reversa coordinates **6 specialized Teams** of agents. Each agent does one thing; each Team groups agents around a phase of the work.

The central orchestrator coordinates who enters when, in what order, and at what pace. You can also trigger agents directly when needed.

---

## The 6 Teams

| Team | Role | In the installer |
|------|------|------------------|
| **Reversa Agents Core** | Discovery and orchestration of the legacy: maps, excavates, interprets and documents. | Always installed |
| **Migration Agents** | Turn legacy specs into a rebuild plan for a modern stack. See [Migration](../migracao/index.md). | Pre-checked |
| **Code Forward Agents** | Drive forward delivery from specs: requirements, plan, to-do, audit, quality, coding. | Pre-checked |
| **Pricing and Size Agents** | Estimate effort, size and pricing on top of the specs. | Pre-checked |
| **Product Strategy Agents** | Generate LLM-ready repository briefs and expanded product plans with `/reversa-brief` and `/reversa-evolve`. See [Product Strategy](../product-strategy/index.md). | Pre-checked |
| **Translators N8N->Specs->Python** | Turn structured artifacts into specs. See [N8N Translator](n8n.md). | Unchecked |

---

## Required agents

| Agent | Phase | Role |
|-------|-------|------|
| [Reversa](reversa.md) | Orchestration | Coordinates all agents, saves checkpoints, guides the user |
| [Scout](scout.md) | Reconnaissance | Maps folders, languages, frameworks, dependencies and entry points |
| [Archaeologist](arqueologo.md) | Excavation | Deep module-by-module analysis |
| [Detective](detetive.md) | Interpretation | Extracts implicit business rules, ADRs, state machines and permissions |
| [Architect](arquiteto.md) | Interpretation | Synthesizes C4, ERD and integration maps |
| [Writer](redator.md) | Generation | Generates SDD specs, OpenAPI and user stories with traceability |

## Optional agents

| Agent | When to use |
|-------|-------------|
| [Reviewer](revisor.md) | After Writer, to review specs and gaps |
| [Visor](visor.md) | When screenshots are available |
| [Data Master](data-master.md) | When DDL, migrations or ORM models exist |
| [Design System](design-system.md) | When CSS, themes or screenshots exist |
| [Soul Extractor](extract-soul.md) | Legacy alias; prefer `/reversa-brief` |

## Translators

| Agent | When to use |
|-------|-------------|
| [N8N Translator](n8n.md) | When an N8N workflow is exported as JSON |
