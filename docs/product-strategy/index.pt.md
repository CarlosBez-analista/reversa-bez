# Product Strategy Agents

O Team **Product Strategy Agents** transforma as saídas do Reversa em conhecimento de produto reutilizável.

Marcado por padrão no instalador.

## Pipeline

```
/reversa-brief       -> pacote de contexto do repositório para LLMs
/reversa-evolve      -> plano de produto alvo expandido
```

## Agentes

| Agente | Função |
|--------|--------|
| `reversa-brief` | Gera `repo_brief.md`, `llm_context_pack.md`, `architecture_digest.md`, `domain_logic_digest.md` e `build_like_this.md` em `_reversa_sdd/brief/`. |
| `reversa-evolve` | Planeja um produto expandido a partir da base analisada, gerando intenção, gaps, spec do produto alvo, novas capacidades, arquitetura, roadmap e handoff em `_reversa_sdd/evolution/`. |
| `reversa-extract-soul` | Alias de compatibilidade do antigo Soul Extractor. Novos fluxos devem usar `reversa-brief`. |

## Exemplo

Se o repositório analisado é um CRM como o Twenty e o alvo é CRM + ERP, `/reversa-evolve` separa:

- base herdada: entidades de CRM, UI, automações, permissões;
- expansão: financeiro, estoque, pedidos, compras, fiscal, relatórios operacionais;
- integração: como os novos módulos ERP se conectam aos conceitos de CRM existentes.

## Pastas de saída

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
