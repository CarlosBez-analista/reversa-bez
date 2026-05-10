# Installation

## Requirements

- Node.js 18+

## One command

In the root of the legacy project:

```bash
npx reversa install
```

The installer:

1. Detects AI engines present in the environment.
2. Asks which **Teams** to install. `Reversa Agents Core` is always included; `Migration Agents`, `Code Forward Agents`, `Pricing and Size Agents`, and `Product Strategy Agents` are pre-checked; `Translators N8N->Specs->Python` is unchecked.
3. Collects project name, language, and preferences.
4. Copies agents to `.agents/skills/` and `.claude/skills/` when Claude Code is selected.
5. Creates the engine entry file (`CLAUDE.md`, `AGENTS.md`, etc.).
6. Creates `.reversa/` with state, configuration, and plan.
7. Generates a SHA-256 manifest for safe updates.

## What gets created

```
legacy-project/
├── .reversa/
├── .agents/skills/
├── .claude/skills/
├── CLAUDE.md
├── AGENTS.md
└── _reversa_sdd/
```

!!! success "Your files stay intact"
    The installer only creates new files. It never modifies or deletes existing project files.

## Adding another engine later

```bash
npx reversa add-engine
```
