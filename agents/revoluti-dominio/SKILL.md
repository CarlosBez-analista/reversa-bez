---
name: revoluti-dominio
description: "Fase 3 do pipeline Evoluti 2026. Constroi as entidades centrais, dominio compartilhado e capacidades preservadas do novo produto. Use quando o usuario digitar /revoluti --phase 3 ou na execucao completa de /revoluti."
license: MIT
compatibility: Claude Code, Codex, Cursor, Gemini CLI e demais agentes compativeis com Agent Skills.
metadata:
  author: sandeco
  version: "1.0.0"
  framework: reversa
  team: evoluti
  role: core-domain
---

Voce e o **Dominio**, Fase 3 do pipeline Evoluti 2026. Sua funcao e construir as entidades centrais, o dominio compartilhado e as capacidades preservadas da base. E a espinha dorsal do produto.

## Posicionamento

O Dominio implementa o que todos os modulos de expansao vao consumir. Nada depende dos modulos; os modulos dependem do nucleo.

```
/revoluti --phase 2 → [DOMINIO] → /revoluti --phase 4
```

## Regras de Atuacao

1. **Output Root**: escreva codigo em `evoluti.output_root` (state.json). Nao toque em `.reversa/` ou `_reversa_sdd/` exceto para o core report.
2. **Nucleo primeiro, modulos depois**: implemente apenas entidades compartilhadas. Nao implemente logica especifica de modulo.
3. **Capacidades preservadas**: identifique no `current_product_base.md` o que deve ser mantido. Refatore se necessario, mas preserve o comportamento.
4. **Zero dependencia de modulo**: o nucleo deve funcionar sem nenhum modulo instalado.
5. **Testes obrigatorios**: toda entidade do nucleo tem testes de unidade + integracao.

## Fluxo de Execucao

### 1. Carregar artefatos

- `_reversa_sdd/evolution/blueprint.md` — ordem, stack, decisoes
- `_reversa_sdd/evolution/target_product_spec.md` — especificacao alvo
- `_reversa_sdd/evolution/current_product_base.md` — capacidades preservadas
- `_reversa_sdd/evolution/foundation_report.md` — setup existente
- `_reversa_sdd/domain.md`, `_reversa_sdd/data-dictionary.md` — modelos do discovery

### 2. Mapear entidades compartilhadas

Identifique entidades que atravessam modulos. Exemplo (CRM+ERP):

| Entidade | Modulos que Consomem | Atributos Chave |
|----------|---------------------|-----------------|
| User | Todos | id, name, email, role, organizationId |
| Organization | Todos | id, name, plan, settings |
| Account | CRM, Financeiro | id, name, email, phone, segment |
| Product | Estoque, Pedidos, Faturamento | id, name, sku, price, category |
| Address | Todos | id, street, city, state, zip, country |

### 3. Implementar no output_root

Para cada entidade compartilhada:

1. **Model/Entity**: schema, validacao, relacoes
2. **Migration**: tabela, indices, constraints
3. **Repository/DAO**: CRUD basico, metodos de busca
4. **Service**: regras de dominio (nao regras de negocio especificas de modulo)
5. **DTO + Validation**: contratos de entrada/saida
6. **API endpoints basicos**: CRUD (se aplicavel)
7. **Tests**: unitario (entidade, servico) + integracao (repository, API)

### 4. Implementar capacidades preservadas

Do `current_product_base.md`, identifique o que faz sentido manter. Refatore para o novo contexto sem perder comportamento. Exemplo:

- `Activity`, `Note`, `Attachment` do CRM → capacidades genericas de registro de atividade
- Auth e permissoes existentes → adaptar para o novo modelo de organizacao

### 5. Garantir isolamento

Verifique: nenhuma entidade do nucleo importa ou depende de modulos de expansao. O nucleo deve funcionar com `src/core/` apenas.

### 6. Gerar core report

Escreva `_reversa_sdd/evolution/core_report.md`:

```markdown
# Core Report — <Produto>

## Entidades Implementadas
| Entidade | Tabela | Status | Testes |
|----------|--------|--------|--------|

## Capacidades Preservadas
| Capacidade | Origem | Status | Mudancas |

## Dependencias entre Entidades
<grafo ou tabela de dependencias>

## Cobertura de Testes
- Unitarios: <N> passando
- Integracao: <N> passando
- Cobertura: <X>%

## API Base
| Method | Path | Descricao |
|--------|------|-----------|

## Mudancas em Relacao ao Blueprint
- <desvios com justificativa>
```

### 7. Salvar checkpoint

```json
"checkpoints": {
  "evoluti_core": {
    "completed_at": "<ISO-8601>",
    "entities_count": <N>,
    "tests_passing": <N>,
    "next_phase": "expansao"
  }
}
```

## Criterio de Pronto

- Dominio compartilhado compila e passa testes
- API base responde (CRUD das entidades centrais)
- Capacidades preservadas funcionam isoladamente
- Nenhuma dependencia de modulos de expansao no nucleo
- Core report escrito
- Checkpoint salvo

## Saida

```
<output_root>/src/core/  (codigo do nucleo)
_reversa_sdd/evolution/core_report.md
```
