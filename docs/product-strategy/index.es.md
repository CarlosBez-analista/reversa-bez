# Product Strategy Agents

El Team **Product Strategy Agents** transforma las salidas de Reversa en conocimiento de producto reutilizable.

Marcado por defecto en el instalador.

## Pipeline

```
/reversa-brief       -> paquete de contexto del repositorio para LLMs
/reversa-evolve      -> plan de producto objetivo expandido
```

## Agentes

| Agente | Función |
|--------|---------|
| `reversa-brief` | Genera `repo_brief.md`, `llm_context_pack.md`, `architecture_digest.md`, `domain_logic_digest.md` y `build_like_this.md` en `_reversa_sdd/brief/`. |
| `reversa-evolve` | Planea un producto expandido a partir de la base analizada, generando intención, gaps, spec del producto objetivo, nuevas capacidades, arquitectura, roadmap y handoff en `_reversa_sdd/evolution/`. |
| `reversa-extract-soul` | Alias de compatibilidad del antiguo Soul Extractor. Los nuevos flujos deben usar `reversa-brief`. |

## Ejemplo

Si el repositorio analizado es un CRM como Twenty y el objetivo es CRM + ERP, `/reversa-evolve` separa:

- base heredada: entidades CRM, UI, automatizaciones, permisos;
- expansión: financiero, inventario, pedidos, compras, fiscal, reportes operacionales;
- integración: cómo los nuevos módulos ERP se conectan con los conceptos CRM existentes.
