# Product Strategy Agents

The **Product Strategy Agents** turn Reversa outputs into reusable product knowledge.

They are pre-checked in the installer.

## Pipeline

```
/reversa-brief       -> LLM-ready repository context pack
/reversa-evolve      -> expanded target product plan
```

## Agents

| Agent | Role |
|-------|------|
| `reversa-brief` | Generates `repo_brief.md`, `llm_context_pack.md`, `architecture_digest.md`, `domain_logic_digest.md`, and `build_like_this.md` under `_reversa_sdd/brief/`. |
| `reversa-evolve` | Plans an expanded product from the analyzed base, generating product intent, gaps, target product spec, new capabilities, architecture, roadmap, and handoff under `_reversa_sdd/evolution/`. |
| `reversa-extract-soul` | Compatibility alias for older Soul Extractor usage. New flows should use `reversa-brief`. |

## Example

If the analyzed repository is a CRM such as Twenty and the target is CRM + ERP, `/reversa-evolve` separates:

- inherited base: CRM entities, UI, automations, permissions;
- expansion: finance, inventory, orders, purchasing, tax, operational reports;
- integration: how new ERP modules connect to existing CRM concepts.

## Output folders

```
_reversa_sdd/
├── brief/
│   ├── repo_brief.md
│   ├── llm_context_pack.md
│   ├── architecture_digest.md
│   ├── domain_logic_digest.md
│   └── build_like_this.md
└── evolution/
    ├── product_intent.md
    ├── current_product_base.md
    ├── expansion_gap.md
    ├── target_product_spec.md
    ├── new_capabilities.md
    ├── target_product_architecture.md
    ├── evolution_roadmap.md
    └── handoff.md
```
