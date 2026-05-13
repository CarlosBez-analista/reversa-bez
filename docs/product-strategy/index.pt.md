# Product Strategy Agents

O Team **Product Strategy Agents** transforma as saidas do Reversa em conhecimento de produto reutilizavel.

Marcado por padrao no instalador.

## Pipeline

```
/reversa-brief       -> pacote de contexto do repositorio para LLMs
/reversa-evolve      -> plano de produto alvo expandido
```

## Agentes

| Agente | Funcao |
|--------|--------|
| `reversa-brief` | Gera `repo_brief.md`, `llm_context_pack.md`, `architecture_digest.md`, `domain_logic_digest.md`, `build_like_this.md`, `traceability.md` e `tasks.md` em `_reversa_sdd/brief/`. |
| `reversa-evolve` | Planeja um produto expandido a partir da base analisada, gerando intencao, gaps, spec do produto alvo, novas capacidades, arquitetura, roadmap, rastreabilidade, tasks e handoff em `_reversa_sdd/evolution/`. |
| `reversa-extract-soul` | Alias de compatibilidade do antigo Soul Extractor. Novos fluxos devem usar `reversa-brief`. |

## Exemplo

Se o repositorio analisado e um CRM como o Twenty e o alvo e CRM + ERP, `/reversa-evolve` separa:

- base herdada: entidades de CRM, UI, automacoes, permissoes;
- expansao: financeiro, estoque, pedidos, compras, fiscal, relatorios operacionais;
- integracao: como os novos modulos ERP se conectam aos conceitos de CRM existentes.

## Pastas de saida

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
