# Reversa 
<small>by sandeco</small>

**Transforme sistemas legados em especificações executáveis para agentes de IA.**

[![English Docs](https://img.shields.io/badge/DOCS-English-009c3b?style=for-the-badge&logo=material-for-mkdocs&logoColor=white&labelColor=2d2d2d)](https://sandeco.github.io/reversa/)<br>
[![Português Docs](https://img.shields.io/badge/DOCS-Portugu%C3%AAs-ffcc00?style=for-the-badge&logo=material-for-mkdocs&logoColor=black&labelColor=2d2d2d)](https://sandeco.github.io/reversa/pt/)<br>
[![Español Docs](https://img.shields.io/badge/DOCS-Espa%C3%B1ol-c60b1e?style=for-the-badge&logo=material-for-mkdocs&logoColor=white&labelColor=2d2d2d)](https://sandeco.github.io/reversa/es/)

Reversa é um framework de engenharia reversa de especificações. Instale-o dentro de um projeto legado e ele coordena uma equipe de agentes de IA especializados para analisar o código existente e gerar especificações completas e rastreáveis, prontas para uso por qualquer agente de codificação.

Ele também inclui modos de estratégia de produto:

- **`/reversa-brief`** cria um pacote de contexto de repositório pronto para LLM a partir do código e especificações analisadas.
- **`/reversa-evolve`** planeja um produto expandido a partir da base analisada, por exemplo, transformando um CRM em um produto CRM + ERP.

---

## Por que o Reversa existe

A maioria dos sistemas de produção carregam anos de conhecimento acumulado: regras de negócio implícitas, decisões arquiteturais não documentadas, lógica crítica enterrada em código que ninguém quer tocar. Esse conhecimento existe, mas está preso.

Agentes de IA são transformadores para criar e evoluir software, mas dependem de especificações para operar com segurança. Para sistemas novos, você escreve a especificação e o agente executa. Para sistemas legados — ou aqueles construídos com vibe coding puro — não há especificação: o agente não tem como saber o que não pode quebrar.

**Reversa é a ponte entre o sistema legado e os agentes de IA.**

Ele analisa o código existente, extrai o conhecimento acumulado (regras de negócio, fluxos, contratos de módulos, decisões arquiteturais retroativas) e transforma tudo em especificações executáveis e rastreáveis, prontas para qualquer agente de codificação.

O resultado não é documentação para humanos lerem. São **contratos operacionais** que permitem a um agente evoluir o sistema com fidelidade ao que já existe.

---

## Instalação

Na raiz do projeto legado:

```bash
npx reversa install
```

O instalador vai:
1. Detectar os motores de IA presentes no ambiente (Claude Code, Codex, Cursor, etc.)
2. Perguntar quais times de agentes instalar — core, migração, forward, precificação e product strategy são selecionados por padrão
3. Coletar nome do projeto, linguagem e preferências
4. Copiar agentes para `.agents/skills/` (e `.claude/skills/` para Claude Code)
5. Criar o arquivo de entrada do motor (`CLAUDE.md`, `AGENTS.md`, etc.)
6. Criar a estrutura `.reversa/` com estado, configuração e plano
7. Gerar manifesto SHA-256 para atualizações seguras

> Reversa **nunca deleta ou modifica** arquivos existentes no seu projeto.
> Agentes escrevem apenas em `.reversa/` e na pasta de saída (`_reversa_sdd/` por padrão).

**Requisitos:** Node.js 18+

---

> [!IMPORTANT]
> ### 🔒 Imutabilidade garantida do projeto legado
>
> O instalador apenas cria arquivos novos (`CLAUDE.md`, `AGENTS.md`, `.agents/skills/`, etc.) e **nunca modifica ou deleta nenhum arquivo existente** no seu projeto. Durante a análise, os agentes operam sob uma diretiva estrita e inviolável: **todas as escritas são restritas a `.reversa/` e `_reversa_sdd/`** — nenhum outro arquivo do seu projeto é tocada.

> [!CAUTION]
> ### 💾 Faça backup do seu projeto antes de começar
>
> Embora o Reversa nunca modifique seus arquivos, agentes de IA podem cometer erros. **Recomendamos fortemente:**
>
> 1. **Versione o projeto em Git** — certifique-se de que todos os arquivos estão commitados antes de iniciar a análise
> 2. **Tenha o repositório no GitHub** (ou GitLab, Bitbucket) — assim você tem uma cópia remota segura
> 3. **Faça uma cópia local da pasta** — um simples `cp -r my-project my-project-backup` protege contra qualquer evento inesperado
>
> Se algo inesperado acontecer durante a análise, você pode restaurar o estado original com `git restore .` ou pela cópia de backup.

> [!WARNING]
> 🔑 **Reversa não solicita, armazena ou transmite chaves de API de nenhum serviço de LLM.** Toda a inteligência é delegada ao agente de IA já presente no seu ambiente (Claude Code, Codex, Cursor, etc.) — sem dependências de autenticação externa.

---

## Como usar

Após a instalação, abra o projeto no agente de IA e ative o Reversa:

```
/reversa
```

Para motores sem suporte a comandos com barra (como Codex):

```
reversa
```

O Reversa vai se apresentar, criar um plano de exploração personalizado e coordenar toda a análise. O progresso é salvo em `.reversa/state.json` em cada checkpoint — se a sessão for interrompida, basta digitar `reversa` para continuar de onde parou.

---

## Como funciona

O Reversa usa um pipeline de 5 fases orquestrado pelo agente **Reversa**:

```
Reconnaissance  Excavation  Interpretation  Generation  Review
    Scout       Archaeologist  Detective      Writer    Reviewer
                                Architect
```

Agentes independentes (executados em qualquer fase): **Visor**, **Data Master**, **Design System**, **Reversa Brief**, **Reversa Evolve**

---

## Agentes

### Obrigatórios

| Agente | Função |
|--------|--------|
| **Reversa** | Orquestrador central. Coordena todos os agentes, salva checkpoints, guia o usuário |
| **Scout** | Mapeia a superfície: estrutura de pastas, linguagens, frameworks, dependências, pontos de entrada |
| **Archaeologist** | Análise profunda módulo a módulo: algoritmos, fluxos de controle, estruturas de dados |
| **Detective** | Extrai conhecimento de negócio implícito: regras, ADRs retroativas, máquinas de estado, permissões |
| **Architect** | Sintetiza tudo em diagramas C4, ERD completo, mapa de integração e dívida técnica |
| **Writer** | Gera especificações como contratos operacionais com rastreabilidade de código |

### Opcionais (instalados por padrão)

| Agente | Função |
|--------|--------|
| **Reviewer** | Revisa especificações, encontra inconsistências e valida lacunas com o usuário |
| **Visor** | Documenta a interface a partir de capturas de tela — sem precisar do sistema estar rodando |
| **Data Master** | Análise completa do banco: DDL, migrações, ORM, ERD, triggers, procedures |
| **Design System** | Extrai tokens de design: cores, tipografia, espaçamento, temas e componentes |
| **Reversa Brief** | Gera um resumo compacto do repositório para LLMs em `_reversa_sdd/brief/`, com `tasks.md` e `traceability.md` |
| **Reversa Evolve** | Planeja um produto expandido a partir da base analisada em `_reversa_sdd/evolution/`, com `tasks.md`, `traceability.md` e `handoff.md` |

### Tradutores (adaptadores de entrada)

Use quando o "código" legado não é código fonte, mas um artefato estruturado como um fluxo visual. Gera a especificação SDD e prepara o estado para o pipeline principal assumir.

| Agente | Função |
|--------|--------|
| **N8N Translator** | Lê workflows N8N exportados como JSON e produz especificações SDD prontas para reimplementação em Python. Ativado via `/reversa-n8n` |

---

## O que é gerado

```
_reversa_sdd/
├── inventory.md              # Inventário do projeto
├── dependencies.md           # Dependências com versões
├── code-analysis.md          # Análise técnica por módulo
├── data-dictionary.md        # Dicionário de dados
├── domain.md                 # Glossário e regras de negócio
├── state-machines.md         # Máquinas de estado em Mermaid
├── permissions.md            # Matriz de permissões
├── architecture.md           # Visão geral da arquitetura
├── c4-context.md             # Diagrama C4: Contexto
├── c4-containers.md          # Diagrama C4: Containers
├── c4-components.md          # Diagrama C4: Componentes
├── erd-complete.md           # ERD completo em Mermaid
├── confidence-report.md      # Relatório de confiança 🟢🟡🔴
├── gaps.md                   # Lacunas identificadas
├── questions.md              # Perguntas para validação humana
├── dynamic.md                # Findings de análise dinâmica (Tracer)
├── sdd/                      # Especificações por componente
│   └── [component].md
├── openapi/                  # Especificações de API (se aplicável)
├── user-stories/             # User stories (se aplicável)
├── adrs/                     # Decisões arquiteturais retroativas
├── flowcharts/              # Fluxogramas em Mermaid
├── sequences/               # Diagramas de sequência
├── ui/                       # Especificações de interface (Visor)
├── database/                # Especificações de banco (Data Master)
├── design-system/           # Tokens de design (Design System)
├── brief/                   # Pacote de contexto repo pronto para LLM, com tasks e rastreabilidade
├── evolution/              # Plano de produto expandido, tasks, rastreabilidade e handoff
└── traceability/
    ├── spec-impact-matrix.md # Qual spec impacta qual
    └── code-spec-matrix.md   # Arquivo de código para spec correspondente
```

### Escala de confiança

Cada declaração nas especificações é marcada com:

| Marca | Significado |
|-------|-------------|
| 🟢 CONFIRMADO | Extraído diretamente do código — pode ser citado com arquivo e linha |
| 🟡 INFERIDO | Deduzido de padrões — pode estar errado |
| 🔴 LACUNA | Não determinável pelo código — requer validação humana |

---

## Motores suportados

| Motor | Arquivo criado | Caminho dos skills | Ativação |
|-------|---------------|-------------------|----------|
| Claude Code ⭐ | `CLAUDE.md` | `.claude/skills/reversa-*/` e `.agents/skills/reversa-*/` | `/reversa` |
| Codex ⭐ | `AGENTS.md` | `.agents/skills/reversa-*/` | `reversa` |
| Cursor ⭐ | `.cursorrules` | `.agents/skills/reversa-*/` | `/reversa` |
| Gemini CLI | `GEMINI.md` | `.agents/skills/reversa-*/` | `/reversa` |
| Windsurf | `.windsurfrules` | `.agents/skills/reversa-*/` | `/reversa` |
| Antigravity | `AGENTS.md` | `.agents/skills/reversa-*/` | `/reversa` |
| Kiro | (nenhum) | `.kiro/skills/reversa-*/` e `.agents/skills/reversa-*/` | `/reversa` |
| Opencode | `AGENTS.md` | `.agents/skills/reversa-*/` | `reversa` |
| Cline | `.clinerules` | `.agents/skills/reversa-*/` | `/reversa` |
| Roo Code | `.roorules` | `.agents/skills/reversa-*/` | `/reversa` |
| GitHub Copilot | `.github/copilot-instructions.md` | `.agents/skills/reversa-*/` | `/reversa` |
| Aider | `CONVENTIONS.md` | `.agents/skills/reversa-*/` | `reversa` |
| Amazon Q Developer | `.amazonq/rules/reversa.md` | `.agents/skills/reversa-*/` | `/reversa` |

---

## Comandos CLI

```bash
npx reversa install      # Instalar o Reversa no projeto
npx reversa status       # Mostrar estado atual da análise
npx reversa update       # Atualizar agentes para a versão mais recente
npx reversa add-agent    # Adicionar um agente ao projeto
npx reversa add-engine   # Adicionar suporte a um novo motor
npx reversa uninstall   # Remover o Reversa do projeto
```

Comandos dos agentes de estratégia de produto:

```bash
/reversa-brief     # Gerar um resumo do repositório pronto para LLM
/reversa-evolve     # Planejar um produto expandido a partir da base analisada
```

O comando `update` detecta arquivos que você modificou via SHA-256 e nunca sobrescreve customizações.
O comando `uninstall` remove apenas arquivos criados pelo Reversa — nada do projeto legado é tocada.

---

## Estrutura interna

```
.reversa/
├── state.json          # Estado da análise entre sessões
├── config.toml         # Configuração do projeto
├── config.user.toml    # Preferências pessoais (não commit)
├── plan.md             # Plano de exploração (editável pelo usuário)
├── version             # Versão instalada
├── context/
│   ├── surface.json    # Gerado pelo Scout
│   └── modules.json    # Gerado pelo Archaeologist
└── _config/
    ├── manifest.yaml       # Metadados da instalação
    └── files-manifest.json # Hashes SHA-256 para atualizações seguras

.agents/skills/         # Skills universais (todos os agentes compatíveis)
.claude/skills/         # Espelho para Claude Code
```

---

## Usando um fork local para desenvolvimento

Se você estiver desenvolvendo uma versão personalizada do Reversa (fork) e quiser testá-la em um projeto legado:

### Passo 1: Instale as dependências do fork

```bash
cd C:\app-dev\reversa-bez
npm install
```

### Passo 2: Execute no projeto legado

```bash
cd C:\app-dev\meu-projeto-legado
node C:\app-dev\reversa-bez\bin\reversa.js install
```

### Alternativa: Criar um atalho

No projeto legado, crie um arquivo `reversa.bat`:

```batch
@echo off
node C:\app-dev\reversa-bez\bin\reversa.js %*
```

Depois execute:
```bash
.\reversa.bat install
```

---

## Contribuindo

Contribuições são bem-vindas. Abra uma issue para discutir antes de submeter um PR.

```bash
git clone https://github.com/sandeco/reversa.git
cd reversa
npm install
```

---

## Licença

MIT — veja [LICENSE](LICENSE) para detalhes.
