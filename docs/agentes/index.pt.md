# Agentes

O Reversa coordena **6 Teams especializados** de agentes. Cada agente faz uma coisa so; cada Team agrupa os agentes em torno de uma fase do trabalho.

O orquestrador central coordena quem entra quando, em que ordem e em que ritmo. Voce tambem pode acionar agentes diretamente quando precisar.

---

## Os 6 Teams

| Team | Funcao | No instalador |
|------|--------|---------------|
| **Reversa Agents Core** | Descoberta e orquestracao do legado: mapeia, escava, interpreta e documenta. | Sempre instalado |
| **Migration Agents** | Transformam as specs do legado em um plano de reconstrucao em stack moderna. Veja [Migracao](../migracao/index.md). | Marcado por padrao |
| **Code Forward Agents** | Conduzem a evolucao a partir das specs: requirements, plan, to-do, audit, quality, coding. | Marcado por padrao |
| **Pricing and Size Agents** | Estimam esforco, tamanho e precificacao a partir das specs. | Marcado por padrao |
| **Product Strategy Agents** | Geram brief de repositorio para LLMs e planejam produtos expandidos com `/reversa-brief` e `/reversa-evolve`. Veja [Product Strategy](../product-strategy/index.md). | Marcado por padrao |
| **Translators N8N->Specs->Python** | Adaptadores que transformam artefatos estruturados em specs. Veja [N8N Translator](n8n.md). | Desmarcado |

---

## Agentes obrigatorios

| Agente | Fase | Funcao |
|--------|------|--------|
| [Reversa](reversa.md) | Orquestracao | Coordena todos os agentes, salva checkpoints e guia o usuario |
| [Scout](scout.md) | Reconhecimento | Mapeia superficie: pastas, linguagens, frameworks, dependencias, entry points |
| [Archaeologist](arqueologo.md) | Escavacao | Analise profunda modulo a modulo |
| [Detective](detetive.md) | Interpretacao | Extrai regras de negocio implicitas, ADRs, maquinas de estado, permissoes |
| [Architect](arquiteto.md) | Interpretacao | Sintetiza tudo em C4, ERD e mapa de integracoes |
| [Writer](redator.md) | Geracao | Gera specs SDD, OpenAPI e user stories com rastreabilidade |

## Agentes opcionais

| Agente | Quando usar |
|--------|-------------|
| [Reviewer](revisor.md) | Apos o Writer, para revisar specs e lacunas |
| [Visor](visor.md) | Quando houver screenshots |
| [Data Master](data-master.md) | Quando houver DDL, migrations ou ORM |
| [Design System](design-system.md) | Quando houver CSS, temas ou screenshots |
| [Soul Extractor](extract-soul.md) | Alias legado; prefira `/reversa-brief` |

## Tradutores

| Agente | Quando usar |
|--------|-------------|
| [N8N Translator](n8n.md) | Quando houver workflow N8N exportado em JSON |
