# Agentes

Reversa coordina **6 Teams especializados** de agentes. Cada agente hace una cosa; cada Team agrupa agentes en torno a una fase del trabajo.

---

## Los 6 Teams

| Team | Funcion | En el instalador |
|------|---------|------------------|
| **Reversa Agents Core** | Descubrimiento y orquestacion del legado: mapea, excava, interpreta y documenta. | Siempre instalado |
| **Migration Agents** | Convierten las specs del legado en un plan de reconstruccion en stack moderno. | Marcado por defecto |
| **Code Forward Agents** | Llevan la entrega desde specs: requirements, plan, to-do, audit, quality, coding. | Marcado por defecto |
| **Pricing and Size Agents** | Estiman esfuerzo, tamano y precio sobre las specs. | Marcado por defecto |
| **Product Strategy Agents** | Generan briefs de repositorio para LLMs y planes de producto expandido con `/reversa-brief` y `/reversa-evolve`. | Marcado por defecto |
| **Translators N8N->Specs->Python** | Transforman artefactos estructurados en specs. | Desmarcado |

## Agentes obligatorios

| Agente | Fase | Funcion |
|--------|------|---------|
| [Reversa](reversa.md) | Orquestacion | Coordina agentes, guarda checkpoints y guia al usuario |
| [Scout](scout.md) | Reconocimiento | Mapea carpetas, lenguajes, frameworks, dependencias y entry points |
| [Archaeologist](arqueologo.md) | Excavacion | Analisis profundo modulo a modulo |
| [Detective](detetive.md) | Interpretacion | Extrae reglas de negocio, ADRs, estados y permisos |
| [Architect](arquiteto.md) | Interpretacion | Sintetiza C4, ERD y mapa de integraciones |
| [Writer](redator.md) | Generacion | Genera specs SDD, OpenAPI y user stories con trazabilidad |

## Agentes opcionales

| Agente | Cuando usar |
|--------|-------------|
| [Reviewer](revisor.md) | Despues del Writer, para revisar specs y brechas |
| [Visor](visor.md) | Cuando haya screenshots |
| [Data Master](data-master.md) | Cuando haya DDL, migrations u ORM |
| [Design System](design-system.md) | Cuando haya CSS, temas o screenshots |
| [Soul Extractor](extract-soul.md) | Alias heredado; prefiera `/reversa-brief` |
