# Product Strategy Agents

El Team **Product Strategy Agents** transforma las salidas de Reversa en conocimiento de producto reutilizable.

Marcado por defecto en el instalador.

## Pipeline

```
/reversa-brief       -> paquete de contexto del repositorio para LLMs
/reversa-evolve      -> plan de producto objetivo expandido
```

## Agentes

| Agente | Funcion |
|--------|---------|
| `reversa-brief` | Genera `repo_brief.md`, `llm_context_pack.md`, `architecture_digest.md`, `domain_logic_digest.md`, `build_like_this.md`, `traceability.md` y `tasks.md` en `_reversa_sdd/brief/`. |
| `reversa-evolve` | Planea un producto expandido a partir de la base analizada, generando intencion, gaps, spec del producto objetivo, nuevas capacidades, arquitectura, roadmap, trazabilidad, tasks y handoff en `_reversa_sdd/evolution/`. |
| `reversa-extract-soul` | Alias de compatibilidad del antiguo Soul Extractor. Los nuevos flujos deben usar `reversa-brief`. |

## Ejemplo

Si el repositorio analizado es un CRM como Twenty y el objetivo es CRM + ERP, `/reversa-evolve` separa:

- base heredada: entidades CRM, UI, automatizaciones, permisos;
- expansion: financiero, inventario, pedidos, compras, fiscal, reportes operacionales;
- integracion: como los nuevos modulos ERP se conectan con los conceptos CRM existentes.

## Carpetas de salida

```
_reversa_sdd/
├── brief/
│   ├── repo_brief.md
│   ├── llm_context_pack.md
│   ├── architecture_digest.md
│   ├── domain_logic_digest.md
│   ├── build_like_this.md
│   ├── traceability.md
│   └── tasks.md
└── evolution/
    ├── tasks.md
    ├── product_intent.md
    ├── current_product_base.md
    ├── expansion_gap.md
    ├── target_product_spec.md
    ├── new_capabilities.md
    ├── target_product_architecture.md
    ├── evolution_roadmap.md
    ├── traceability.md
    └── handoff.md
```
