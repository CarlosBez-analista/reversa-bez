# Pipeline Evoluti 2026 — Criação de Novo Produto

## Propósito

Pipeline de **criação sistemática** de um novo produto a partir dos artefatos de descoberta `/reversa` + evolução `/reversa-evolve`. Onde `/reversa-evolve` **planeja**, o Evoluti 2026 **constrói**.

## Posicionamento

```
/reversa → _reversa_sdd/
    → /reversa-brief → _reversa_sdd/brief/
    → /reversa-evolve → _reversa_sdd/evolution/ (plano)
    → [EVOLUTI 2026] → _reversa_sdd/evolution/ + código do novo produto
```

## Visão Geral

O pipeline evoluti 2026 é composto por **6 fases**, cada uma com agente responsável, artefatos de entrada/saída e critério de pronto. As fases executam em sequência, com checkpoints entre cada uma.

```
Fase 1 — Decisão     (Conselheiro)   → resolver pendências, confirmar stack, aprovar blueprint
Fase 2 — Fundação    (Construtor)    → setup projeto, DB, CI/CD, identidade visual
Fase 3 — Núcleo      (Domínio)       → entidades centrais, domínio compartilhado, base do produto
Fase 4 — Expansão    (Módulos)       → cada novo módulo/capacidade um a um
Fase 5 — Integração  (Orquestrador)  → fluxos cruzados, integrações, dados compartilhados
Fase 6 — Validação   (Verificador)   → testes, revisão, validação contra spec, deploy
```

Cada fase pode ser executada isoladamente via `/revoluti --phase <numero>`, desde que as fases anteriores estejam completas.

---

## Fase 1 — Decisão (Conselheiro)

**Função**: Revisar os artefatos do `/reversa-evolve`, resolver ambiguidades, confirmar decisões de stack e gerar um blueprint executável. Se alguma decisão marcada como 🔴 no `/reversa-evolve` ainda estiver pendente, o Conselheiro pergunta ao usuário antes de seguir.

### Entrada
- `_reversa_sdd/evolution/product_intent.md`
- `_reversa_sdd/evolution/target_product_spec.md`
- `_reversa_sdd/evolution/target_product_architecture.md`
- `_reversa_sdd/evolution/expansion_gap.md`
- `_reversa_sdd/evolution/handoff.md`
- `_reversa_sdd/evolution/traceability.md`

### Atividades

1. **Resolver pendências humanas**: percorrer `handoff.md` e `traceability.md`, identificar 🔴 e perguntar ao usuário. Não avançar enquanto houver bloqueio sem resposta.
2. **Confirmar stack-alvo**: framework, banco, infraestrutura, linguagem, bibliotecas essenciais. Se o `/reversa-evolve` não especificou, perguntar.
3. **Validar coerência blueprint**: cada capacidade nova na spec tem correspondência na arquitetura? Cada módulo tem fontes rastreáveis?
4. **Definir ordem de construção**: sequência real de implementação (pode divergir da ordem lógica dos módulos). Priorizar o que desbloqueia o resto.
5. **Estimar esforço por módulo**: pequeno/médio/grande + dependências entre módulos.

### Saída
```
_reversa_sdd/evolution/blueprint.md
```

### Estrutura do blueprint
```markdown
# Blueprint de Criação — <Nome do Produto>

## Stack Confirmada
- Frontend: <framework + versão>
- Backend: <framework + versão>
- Banco: <tipo + versão>
- Infra: <cloud/tooling>
- Ferramentas: <testes, CI/CD, lint>

## Módulos (Ordem de Construção)
| # | Módulo | Capacidade | Deps | Estimativa | Critério de Pronto |
|---|--------|------------|------|------------|-------------------|

## Decisões Registradas
| Decisão | Opção Escolhida | Alternativa | Fonte |
|---------|----------------|-------------|-------|

## Riscos e Mitigações
| Risco | Impacto | Mitigação |
|-------|---------|-----------|

## Pendências (zero ao final)
```

### Critério de Pronto
- 🔴 pendências do evolve resolvidas
- Stack confirmada pelo usuário
- Blueprint sem lacunas entre spec e arquitetura
- Ordem de construção aprovada

### Checkpoint
```json
"checkpoints": {
  "evoluti_decision": {
    "completed_at": "<ISO-8601>",
    "blueprint": "_reversa_sdd/evolution/blueprint.md",
    "modules_count": <N>,
    "stack": "<framework>",
    "next_phase": "fundacao"
  }
}
```

---

## Fase 2 — Fundação (Construtor)

**Função**: Criar a base do projeto — estrutura de diretórios, configuração do framework, banco de dados, CI/CD, identidade visual e convenções de código. Tudo que um módulo precisa para existir.

### Entrada
- `blueprint.md`
- `target_product_architecture.md` (diagramas C4, ERD)

### Atividades

1. **Inicializar projeto**: estrutura de diretórios, scaffolding do framework escolhido.
2. **Configurar banco**: migração inicial, models base, seed base (se aplicável).
3. **Setup CI/CD**: pipeline de build + testes + deploy configurado.
4. **Autenticação/autorização**: setup de auth, roles base, proteção de rotas.
5. **Identidade visual**: tema, logo, cores, tipografia (se aplicável).
6. **Convenções de código**: linter, formatter, pre-commit hooks, estrutura de commits.
7. **Configurar monitoração**: logs, health checks, métricas iniciais.
8. **Criar documentação do setup**: `README.md`, `CONTRIBUTING.md`, `ARCHITECTURE.md` base.

### Saída
```
_reversa_sdd/evolution/foundation_report.md
```

Relatório contendo:
- Estrutura de diretórios criada
- Stack configurada (versões, flags)
- Checklist de setup completo
- Instruções para rodar localmente

Além de:
- Projeto alvo com estrutura de diretórios funcional
- Arquivos de configuração (package.json, docker-compose, Makefile, etc.)
- README.md do projeto

### Critério de Pronto
- Projeto inicializa e compila sem erros
- Primeira migração de DB roda
- Health check endpoint responde 200
- CI/CD pipeline passa

---

## Fase 3 — Núcleo (Domínio)

**Função**: Construir as entidades centrais, o domínio compartilhado e as capacidades preservadas da base. É a "espinha dorsal" do produto — tudo que os módulos de expansão vão consumir.

### Entrada
- `blueprint.md`
- `target_product_spec.md`
- `current_product_base.md` (capacidades preservadas)
- `foundation_report.md`

### Atividades

1. **Modelar domínio compartilhado**: entidades que atravessam módulos (ex: Usuário, Organização, Cliente, Produto).
2. **Implementar camada base**: repositories, services, DTOs, validações.
3. **Criar capacidades preservadas**: o que vem do produto original que faz sentido manter.
4. **API base**: contratos REST/GraphQL compartilhados.
5. **Testes de unidade integração do núcleo**.

### Saída
```
_reversa_sdd/evolution/core_report.md
```
- Mapa de entidades implementadas vs planejadas
- Cobertura de testes
- Dependências entre entidades
- Mudanças de rota/contrato

### Exemplo (CRM → ERP)
- User, Organization, Account, Contact, Opportunity → entidades compartilhadas
- Activity, Note, Attachment → capacidades preservadas refatoradas
- Auth e permissões → base para todos os módulos

### Critério de Pronto
- Domínio compartilhado compila e passa testes
- API base responde (ao menos CRUD das entidades centrais)
- Capacidades preservadas funcionam isoladamente
- Não há dependência de módulos de expansão no núcleo

---

## Fase 4 — Expansão (Módulos)

**Função**: Construir cada novo módulo/capacidade **um por vez**, seguindo a ordem definida no blueprint. Cada módulo é independente — pode ser construído em paralelo por agentes diferentes ou em sequência.

### Entrada
- `blueprint.md` (ordem de construção)
- `target_product_spec.md`
- `new_capabilities.md`
- Núcleo implementado (Fase 3)
- Módulos anteriores (se houver)

### Atividades (por módulo)

Para cada módulo na ordem do blueprint:

1. **Analisar especificação do módulo**: entidades novas, regras, conexões com domínio compartilhado.
2. **Implementar entidades do módulo**: models, migrations, seeds.
3. **Implementar lógica de negócio**: services, workflows, regras de domínio.
4. **Implementar API do módulo**: endpoints, schemas, validação.
5. **Implementar UI do módulo** (se aplicável): telas, componentes, formulários.
6. **Testes do módulo**: unitários, integração, (opcional: E2E).
7. **Documentação do módulo**: README local, Swagger/OpenAPI.

### Saída (um arquivo por módulo)
```
_reversa_sdd/evolution/reports/module_<nome>.md
```
- Status de implementação (completo/parcial/pendente)
- Artefatos gerados
- Desvios da especificação original (com justificativa)
- Testes e cobertura
- Decisões tomadas durante implementação
- Dependências para integração

### Critério de Pronto (por módulo)
- Módulo compila e passa testes isoladamente
- API documentada e funcional
- UI renderiza (se aplicável)
- Nenhuma dependência circular com outros módulos (apenas com núcleo)

---

## Fase 5 — Integração (Orquestrador)

**Função**: Conectar os módulos entre si, implementar fluxos que atravessam múltiplos módulos e garantir que o produto funcione como um todo coerente. Também gerencia dados compartilhados e migra dados se necessário.

### Entrada
- Todos os módulos implementados (Fase 4)
- `blueprint.md` (seção de integrações)
- `target_product_architecture.md` (fluxos entre módulos)

### Atividades

1. **Mapear pontos de integração**: cada módulo consome o quê de outro módulo? Quais eventos/APIs conectam?
2. **Implementar fluxos cruzados**:
   - Fluxos de dados entre módulos
   - Eventos/mensageria entre módulos
   - Sagas/transações distribuídas (se necessário)
   - Compartilhamento de identidade e contexto
3. **Resolver conflitos**: naming collisions, duplicação de dados, permissões sobrepostas.
4. **Criar integrações externas**: APIs de terceiros, webhooks, SSO, gateways de pagamento.
5. **Testes de integração**: fluxos completos ponta-a-ponta entre módulos.

### Saída
```
_reversa_sdd/evolution/integration_report.md
```
- Mapa de integrações implementadas
- Fluxos cruzados funcionais
- Testes de integração (cobertura, resultados)
- Pendências de integração
- Recomendações de performance

### Exemplo (CRM → ERP)
- Opportunity (CRM) → Order (ERP) → Invoice (Financeiro)
- Account (CRM) → Customer (Financeiro) → Shipping (Estoque)
- Activity (CRM) → Workflow (Operacional)

### Critério de Pronto
- Fluxos cruzados principais funcionam
- Não há deadlocks ou inconsistências entre módulos
- Testes de integração passam
- Produto pode ser executado como uma unidade

---

## Fase 6 — Validação (Verificador)

**Função**: Validar o produto construído contra as especificações originais, executar testes completos, gerar relatório de qualidade e preparar para deploy.

### Entrada
- Produto completo (Fases 2-5)
- `target_product_spec.md`
- `evolution_roadmap.md`
- `blueprint.md`

### Atividades

1. **Validar contra especificação**: cada capacidade planejada está implementada? Cada requisito não-funcional foi atendido?
2. **Executar suite de testes**: unitários + integração + E2E + segurança.
3. **Auditar qualidade**: cobertura de código, performance, acessibilidade, boas práticas.
4. **Validar UX** (se aplicável): fluxos de usuário, responsividade, consistência visual.
5. **Gerar relatório de qualidade**.
6. **Preparar para deploy**: configuração de produção, variáveis de ambiente, infra.
7. **Criar documentação final**: README completo, guia de deploy, guia de uso, changelog.
8. **Sugerir próximos passos**: o que veio depois? /reversa-forward? novo ciclo evoluti?

### Saída
```
_reversa_sdd/evolution/validation_report.md
```
- Score de qualidade (0-10 por dimensão)
- Capacidades implementadas vs planejadas (matriz)
- Testes: total, passando, falhando, cobertura
- Pendências críticas (P0/P1) que bloqueiam produção
- Recomendações pós-deploy

### Critério de Pronto
- Spec coverage ≥ 90% (se abaixo, justificativa documentada)
- Zero P0 blockers
- Suite de testes passa
- Build de produção bem-sucedido

---

## Agentes do Pipeline Evoluti 2026

| Fase | Agente | Função |
|------|--------|--------|
| 1 | **Conselheiro** | Revisa, decide, blueprint |
| 2 | **Construtor** | Fundação, setup, infra |
| 3 | **Domínio** | Entidades centrais, núcleo |
| 4 | **Módulo** | Cada módulo/capacidade |
| 5 | **Orquestrador** | Conexões, integrações |
| 6 | **Verificador** | Testes, qualidade, deploy |

Cada agente tem seu `SKILL.md` próprio (a criar), seguindo o mesmo padrão dos demais skills reversa.

---

## Integração com Discovery

### Compatibilidade de Fontes

A pipeline evoluti 2026 consome os artefatos do `/reversa` e `/reversa-evolve`. O que cada fase consome:

| Fase | Consome de Discovery | Consome de Evolve |
|------|---------------------|-------------------|
| 1 | `architecture.md`, `domain.md` | `product_intent.md`, `target_product_spec.md`, `target_product_architecture.md`, `expansion_gap.md`, `handoff.md`, `traceability.md` |
| 2 | `architecture.md`, `inventory.md` | `blueprint.md`, `target_product_architecture.md` |
| 3 | `domain.md`, `data-dictionary.md`, `code-analysis.md` | `current_product_base.md`, `target_product_spec.md` |
| 4 | `inventory.md`, `permissions.md`, `state-machines.md` | `new_capabilities.md`, `target_product_spec.md`, `blueprint.md` |
| 5 | `architecture.md`, `permissions.md` | `target_product_architecture.md`, `blueprint.md` |
| 6 | `domain.md`, `traceability/` | `target_product_spec.md`, `evolution_roadmap.md`, `blueprint.md` |

### Estado Compartilhado

A pipeline usa `.reversa/state.json` com checkpoint `evoluti`:

```json
"checkpoints": {
  "evoluti": {
    "current_phase": 3,
    "phase_name": "dominio",
    "completed_phases": ["decisao", "fundacao"],
    "output_dir": "_reversa_sdd/evolution/",
    "target_product": "CRM+ERP",
    "modules_done": [],
    "modules_pending": ["financeiro", "estoque", "pedidos", ...]
  }
}
```

---

## Comandos

### `/revoluti` — executar pipeline completa
Roda todas as 6 fases em sequência. Opcional: `--phase N` para começar de uma fase específica.

### `/revoluti --phase 1` — executar fase específica
Roda apenas a fase indicada. Verifica se fases anteriores estão completas; se não, sugere rodá-las.

### `/revoluti --resume` — retomar de onde parou
Lê `.reversa/state.json`, identifica a última fase executada e continua da próxima.

### `/revoluti --status` — mostrar progresso atual
Exibe quais fases foram concluídas, qual está em andamento, quantos módulos implementados.

---

## Princípios

1. **Non-destructive**: nunca modificar `_reversa_sdd/` existente, apenas adicionar.
2. **Rastreabilidade**: cada linha de código tem uma fonte (discovery → evolve → decision → code).
3. **Uma fase de cada vez**: cada fase é concluída antes da próxima começar.
4. **Falhe rápido**: se uma fase não pode ser concluída (ex: stack rejeitada), aborta e informa.
5. **Skip inteligente**: fases 3-4 pulam módulos já marcados como `done` no state.
6. **Conversacional**: quando o blueprint ou spec é ambíguo, pergunta. Nunca assume.
7. **Zero dead code**: o que não está na spec não é implementado (YAGNI).

---

## Restrições do Framework Reversa que Bloqueiam o Evoluti 2026

A análise do código-fonte do framework reversa identificou **10 restrições** que impedem a execução do pipeline evoluti 2026 no estado atual. Abaixo, cada restrição com sua localização exata, o impacto e a resolução necessária.

### 1. Regra não-negociável: "escreve APENAS em .reversa/ e _reversa_sdd/"

**Arquivo**: `templates/engines/CLAUDE.md:23-25`, `templates/engines/GEMINI.md:22-24`, `templates/engines/AGENTS.md:22-24`, `templates/engines/cursorrules:7-8`, `templates/engines/windsurf:7-8`, mais todos os outros entry files.

**Texto literal**: `"Nunca apague, modifique ou sobrescreva arquivos pré-existentes do projeto legado. O Reversa escreve APENAS em .reversa/ e _reversa_sdd/."`

**Impacto**: As fases 2-5 do evoluti precisam criar código-fonte do novo produto (arquivos .ts, .py, .sql, .yml, etc.) em um diretório **fora** de `.reversa/` e `_reversa_sdd/`. Qualquer agente que siga essa regra não conseguirá executar as tarefas de construção.

**Resolução**: Adicionar exceção explícita em todos os entry files:
```
O Reversa escreve APENAS em .reversa/ e _reversa_sdd/.
EXCEÇÃO: o pipeline /revoluti pode escrever código-fonte no diretório definido
em .reversa/state.json → evoluti.output_root.
```

### 2. Orquestrador central restringe saída

**Arquivo**: `agents/reversa/SKILL.md:121-123`
**Texto literal**: `"Nunca apague, modifique ou sobrescreva arquivos pré-existentes do projeto. O Reversa escreve APENAS em .reversa/, _reversa_sdd/ e em _reversa_forward/<feature>/regression-watch.md (apenas seção de histórico, nunca a tabela principal)."`

**Impacto**: O orquestrador é a âncora de todos os agentes. Se o Conselheiro/Construtor/Domínio seguem o orquestrador, não escrevem código.

**Resolução**: Mesma exceção. Adicionar `evoluti.output_root` como destino permitido.

### 3. writer.js — `_writeNew` não sobrescreve e não suporta output externo

**Arquivo**: `lib/installer/writer.js:17-18, 64-70`

```js
constructor(projectRoot) {
  this.projectRoot = projectRoot;  // sempre process.cwd()
  ...
}
_writeNew(filePath, content) {
  if (existsSync(filePath)) return false;  // silencioso
  ...
}
```

**Impacto**: O writer foi projetado para instalar skills dentro do projeto analisado. Não aceita um `outputRoot` diferente. Se o evoluti precisar regerar um módulo (ex: após correção), `_writeNew` falha silenciosamente.

**Resolução**: Adicionar suporte a `outputRoot` no writer (ou criar `EvolutiWriter` separado). Adicionar método `writeOrUpdate` que sobrescreve mediante confirmação.

### 4. Sem time Evoluti no installer

**Arquivo**: `lib/installer/prompts.js:42-58`

```js
const PRODUCT_STRATEGY_TEAM = [
  'reversa-brief',
  'reversa-evolve',
  'reversa-extract-soul',
];
// Não existe EVOLUTI_TEAM
```

**Arquivo**: `lib/commands/install.js:150-156`

```js
const productStrategyInstalled = answers.agents.filter(...)
// Product strategy é o último time verificado
```

**Impacto**: Não há como um usuário instalar os agentes do evoluti via `npx reversa install`. O time product-strategy termina em `/reversa-evolve` (planejamento) — a criação está fora.

**Resolução**: Adicionar `EVOLUTI_TEAM` em `prompts.js` com os 6 agentes. Adicionar seção no resumo do `install.js`. Marcar como não-instalado por padrão (opt-in).

### 5. Nenhum comando `/revoluti` registrado

**Arquivo**: `templates/engines/CLAUDE.md:17-21`, `templates/engines/GEMINI.md:17-20`, etc.

```
## Comandos disponíveis
- **`/reversa`** - Iniciar ou retomar análise do projeto
- **`/reversa-brief`** - Gerar pacote de contexto LLM-ready do repositório
- **`/reversa-evolve`** - Planejar produto expandido (ex: CRM → CRM+ERP)
```

**Impacto**: O usuário não tem como invocar o pipeline evoluti. O agente de IA não sabe que `/revoluti` existe.

**Resolução**: Adicionar entries em TODOS os entry files:
```
- **`/revoluti`** - Criar novo produto a partir da análise (requer /reversa-evolve primeiro)
```

### 6. Pipeline discovery é linear fixo

**Arquivo**: `templates/state.json:13`

```json
"pending": ["reconhecimento", "escavacao", "interpretacao", "geracao", "revisao"]
```

**Arquivo**: `templates/plan.md` — 5 fases fixas.

**Impacto**: O state.json e plan.md do discovery descrevem 5 fases. O evoluti tem 6 fases próprias. Misturar os dois quebra ambos. O evoluti precisa de seu próprio state e plan.

**Resolução**: O evoluti usa uma seção separada em state.json (`checkpoints.evoluti`) com suas próprias fases. Não modificar as 5 fases do discovery. Criar `templates/evolution/plan.md` separado.

### 7. `projectRoot` hardcoded para `process.cwd()`

**Arquivo**: `lib/commands/install.js:29`
```js
const projectRoot = resolve(process.cwd());
```

**Arquivo**: `lib/commands/update.js:26`
```js
const projectRoot = resolve(process.cwd());
```

**Impacto**: O novo produto criado pelo evoluti estará em um diretório diferente do projeto analisado (ex: o usuário analisa `./twenty-crm` e quer criar `./novo-erp`). O framework hoje assume que o target é o cwd.

**Resolução**: Adicionar `evoluti.output_root` no state.json, definido pelo usuário na Fase 1. O output_root é passado para os agentes que escrevem código. Agentes de análise continuam usando `projectRoot` (cwd).

### 8. 26 agentes analíticos, zero construtores

**Todos os agents em**: `agents/reversa*/SKILL.md`

**Observação**: Nenhum skill existente escreve código de aplicação. Todos leem o projeto, geram specs/documentos, ou planejam. Os 6 agentes do evoluti (Conselheiro, Construtor, Domínio, Módulo, Orquestrador, Verificador) serão os primeiros skills que **escrevem código executável**.

**Impacto**: Os padrões de SKILL.md existentes não preveem ações de `npm init`, `git init`, `docker compose up`, criação de arquivos .tsx/.py/.sql — ações essenciais nas fases 2-5.

**Resolução**: Criar novo padrão de SKILL.md para "builder agents" — inclui permissoes para execução de comandos shell, criação de diretórios externos, scaffolding de projeto.

### 9. `update.js` hardcoded para `registry.npmjs.org/reversa`

**Arquivo**: `lib/commands/update.js:47`
```js
const latestVersion = await fetchLatestVersion('reversa');
```

**Arquivo**: `agents/reversa/SKILL.md:73-75`
```text
Compare `.reversa/version` com `https://registry.npmjs.org/reversa/latest`.
```

**Impacto**: Se o fork for publicado com nome diferente (ex: `revoluti` ou `reversa-bez`), o update verifica a versão errada.

**Resolução**: Extrair `packageName` de `package.json` ou tornar configurável. Se for usar o mesmo nome `reversa`, ignorar (não afeta o evoluti diretamente, mas afeta o fork).

### 10. Sem suporte a output_root no state.json

**Arquivo**: `templates/state.json:9-11`
```json
"output_folder": "_reversa_sdd",
"forward_folder": "_reversa_forward",
"phase": null,
```

**Impacto**: O state não tem campo para armazenar para onde o novo produto será gerado. A Fase 1 (Conselheiro) pergunta ao usuário o diretório de saída, mas não há onde persistir.

**Resolução**: Adicionar campo no state.json e nas atualizações de checkpoint:
```json
"evoluti": {
  "output_root": "../novo-erp",
  "current_phase": 1,
  ...
}
```

### Matriz de Resumo

| # | Restrição | Arquivo(s) | Bloqueia | Esforço |
|---|-----------|-----------|----------|---------|
| 1 | Regra non-destructive | Todos entry files | Fases 2-5 escreverem código | Pequeno (add exceção) |
| 2 | Orquestrador restringe saída | `agents/reversa/SKILL.md` | Fases 2-5 | Pequeno (add exceção) |
| 3 | writer.js sem outputRoot | `lib/installer/writer.js` | Instalação dos agentes | Médio (criar EvolutiWriter) |
| 4 | Sem time Evoluti | `lib/installer/prompts.js`, `install.js` | Usuário não instala agentes | Pequeno (add time) |
| 5 | Sem comandos `/revoluti` | Todos entry files | Usuário não invoca pipeline | Pequeno (add entries) |
| 6 | Pipeline discovery fixo | `templates/state.json`, `plan.md` | Fases conflitam | Nenhum (usar seção separada) |
| 7 | projectRoot hardcoded | `install.js`, `update.js` | Output em diretório diferente | Médio (add output_root) |
| 8 | Zero agentes construtores | Todos `agents/*/SKILL.md` | Precisa criar 6 novos | Grande (criar 6 skills) |
| 9 | update.js aponta npm errado | `lib/commands/update.js` | Version check do fork | Pequeno (configurável) |
| 10 | Sem output_root no state | `templates/state.json` | Onde persistir diretório alvo | Pequeno (add campo) |

### Plano de Resolução por Ordem

1. **(#5)** Adicionar comandos `/revoluti`, `/revoluti --phase N`, `/revoluti --resume`, `/revoluti --status` nos entry files
2. **(#10)** Adicionar `evoluti.output_root` e `evoluti.current_phase` no template state.json
3. **(#1, #2)** Adicionar exceção de saída nos entry files e no orquestrador
4. **(#4)** Criar `EVOLUTI_TEAM` em prompts.js + seção no install.js summary
5. **(#3)** Criar `EvolutiWriter` em `lib/installer/evoluti-writer.js` com suporte a outputRoot e writeOrUpdate
6. **(#8)** Criar SKILL.md para cada um dos 6 agentes
7. **(#7)** Adicionar `output_root` no state.json e propagar para os agentes
8. **(#9)** Ajustar packageName no update.js (se aplicável ao fork)
9. **(#6)** Testar execução isolada — descobrir conflitos não previstos

---

## Próximos Passos

1. Criar agente **Conselheiro** (`SKILL.md`) — Fase 1
2. Criar agente **Construtor** (`SKILL.md`) — Fase 2
3. Criar agente **Domínio** (`SKILL.md`) — Fase 3
4. Criar agente **Módulo** (`SKILL.md`) — Fase 4
5. Criar agente **Orquestrador** (`SKILL.md`) — Fase 5
6. Criar agente **Verificador** (`SKILL.md`) — Fase 6
7. Registrar comandos `/revoluti*` nos entry files (CLAUDE.md, AGENTS.md, etc.)
8. Adicionar `evoluti` time ao installer/prompts
9. Integrar checkpoints com `.reversa/state.json`
10. Testar pipeline completo contra um caso real

---

## Anexo: Entendendo o Funcionamento da Criação de Novo Produto

A criação de um novo produto no framework **Reversa** é realizada de forma sistemática através da pipeline **Evoluti 2026** (invocada pelo comando `/revoluti`). Pode ser dividida em três pilares principais: o fluxo de dados, as 6 fases de construção e o isolamento de escrita.

### 1. O Fluxo de Trabalho (Posicionamento)

A criação do novo produto é alimentada pela inteligência extraída do código legado:

```text
[Código Legado] 
      │
      ▼
1. /reversa ──────────► Mapeia o legado e gera a especificação técnica (_reversa_sdd/)
      │
      ▼
2. /reversa-brief ────► Compacta o contexto do legado para IAs (_reversa_sdd/brief/)
      │
      ▼
3. /reversa-evolve ───► Planeja e desenha a evolução do produto (_reversa_sdd/evolution/)
      │
      ▼
4. [EVOLUTI 2026] ────► Constrói o novo produto baseado no planejamento (/revoluti)
```

Enquanto o `/reversa-evolve` **planeja** (mapeia gaps, define requisitos e desenha a arquitetura-alvo), o **Evoluti 2026** **constrói** o código-fonte do novo sistema.

### 2. As 6 Fases da Construção (`/revoluti`)

A pipeline de desenvolvimento é dividida em 6 fases sequenciais, orquestradas por agentes especializados:

| Fase | Nome | Agente Responsável | Atividade Principal | Artefato Gerado |
| :--- | :--- | :--- | :--- | :--- |
| **Fase 1** | **Decisão** | **Conselheiro** | Resolve pendências com o usuário, valida a stack tecnológica (ex: React, Next.js, FastAPI, PostgreSQL) e define a ordem de construção. | `blueprint.md` |
| **Fase 2** | **Fundação** | **Construtor** | Configura a estrutura do novo projeto, inicializa o banco (migrations base), cria CI/CD, setup de Auth e convenções de código. | `foundation_report.md` + Estrutura do Projeto |
| **Fase 3** | **Núcleo** | **Domínio** | Cria a "espinha dorsal": as entidades centrais compartilhadas (ex: Usuário, Organização) e as capacidades herdadas do legado. | `core_report.md` + Código-fonte do Núcleo |
| **Fase 4** | **Expansão** | **Módulo** | Constrói cada novo módulo planejado no blueprint de forma isolada, criando models, regras de negócio, endpoints e telas. | `module_<nome>.md` + Código dos Módulos |
| **Fase 5** | **Integração** | **Orquestrador** | Conecta os módulos. Codifica os fluxos cruzados, eventos/mensageria e integrações com serviços externos (ex: gateways de pagamento). | `integration_report.md` + Código de Integração |
| **Fase 6** | **Validação** | **Verificador** | Audita o produto contra as especificações. Executa suites de testes, gera relatórios de qualidade e prepara o deploy de produção. | `validation_report.md` + Build final de Produção |

### 3. O Isolamento de Escrita (`output_root`)

Para manter a integridade do sistema legado (que o Reversa lê sem alterar), o **Evoluti 2026** introduz a configuração **`output_root`**:

1. Na **Fase 1 (Decisão)**, o **Conselheiro** alinha em qual pasta externa o novo produto deve ser criado (ex: `../novo-erp`).
2. O caminho é gravado na propriedade `evoluti.output_root` no `.reversa/state.json`.
3. Os agentes construtores (Fases 2 a 5) recebem permissão para escrever código **exclusivamente no diretório apontado por `output_root`**.
4. Isso garante que o projeto legado original permaneça intacto.

### 4. Controle e Resiliência da Pipeline

Você pode controlar a criação de forma granular através do terminal do agente:

* **`/revoluti`**: Executa todo o processo (Fases 1 a 6) sequencialmente.
* **`/revoluti --phase <1-6>`**: Executa apenas uma etapa específica.
* **`/revoluti --resume`**: Retoma a construção do último checkpoint em `.reversa/state.json` caso interrompido.
* **`/revoluti --status`**: Mostra o progresso atual, fases concluídas e módulos pendentes.
