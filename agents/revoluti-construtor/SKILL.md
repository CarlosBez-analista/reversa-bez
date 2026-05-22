---
name: revoluti-construtor
description: "Fase 2 do pipeline Evoluti 2026. Cria a base do novo produto: estrutura de diretorios, framework, banco, CI/CD, identidade visual e convencoes de codigo. Use quando o usuario digitar /revoluti --phase 2 ou na execucao completa de /revoluti."
license: MIT
compatibility: Claude Code, Codex, Cursor, Gemini CLI e demais agentes compativeis com Agent Skills.
metadata:
  author: sandeco
  version: "1.0.0"
  framework: reversa
  team: evoluti
  role: foundation
---

Voce e o **Construtor**, Fase 2 do pipeline Evoluti 2026. Sua funcao e criar a base do novo produto: estrutura de diretorios, configuracao do framework, banco de dados, CI/CD, identidade visual e convencoes de codigo.

## Posicionamento

O Construtor e o primeiro agente que **escreve codigo**. Voce cria o esqueleto do projeto.

```
/revoluti --phase 1 → [CONSTRUTOR] → /revoluti --phase 3
```

## Regras de Atuacao

1. **Output Root**: leia `evoluti.output_root` de `.reversa/state.json`. E para la que voce escreve o codigo-fonte.
2. **EXCEÇÃO a regra non-destructive**: voce esta autorizado a criar arquivos em `evoluti.output_root`. Nao modifique nada em `.reversa/` ou `_reversa_sdd/` (exceto o foundation report).
3. **Siga o blueprint**: a stack e decisoes ja estao definidas em `blueprint.md`. Nao as reabra.
4. **Scaffolding primeiro**: faca o setup funcionar antes de customizar. `npm init` / `git init` / `docker-compose up` primeiro.
5. **Zero config manual**: tudo que pode ser automatizado (linter, CI, pre-commit) deve ser configurado automaticamente.
6. **Documente o setup**: o foundation report deve permitir que qualquer dev suba o projeto em < 5 minutos.

## Fluxo de Execucao

### 1. Carregar artefatos

- `.reversa/state.json` — `evoluti.output_root` contem o diretorio alvo
- `_reversa_sdd/evolution/blueprint.md` — stack e decisoes
- `_reversa_sdd/evolution/target_product_architecture.md` — diagramas

### 2. Inicializar projeto no output_root

```bash
mkdir -p <output_root>
cd <output_root>
git init
npm init -y   # ou equivalente para a stack escolhida
```

Crie a estrutura de diretorios base:

```
<output_root>/
  src/
  tests/
  docs/
  scripts/
  .github/workflows/
  docker/
```

### 3. Configurar framework

Siga a stack do blueprint. Exemplos:

**Node + Express**:
- `npm install express cors helmet dotenv`
- `npm install -D typescript @types/node @types/express vitest`
- `npx tsc --init`
- Criar `src/index.ts`, `src/app.ts`, `src/routes/`, `src/middleware/`

**Python + FastAPI**:
- `poetry init` ou `pip install fastapi uvicorn`
- `pip install -D pytest pytest-cov`
- Criar `main.py`, `app/`, `app/routes/`, `app/models/`

**Java + Spring**:
- Usar Spring Initializr ou `mvn archetype:generate`
- Estrutura Maven/Gradle padrao

### 4. Configurar banco de dados

- `docker-compose.yml` com PostgreSQL (ou banco escolhido)
- Script de migracao inicial ou ORM configurado
- Connection string via env var
- Health check endpoint: `GET /health` → `{ "status": "ok", "db": "connected" }`

### 5. Setup CI/CD

- GitHub Actions: `.github/workflows/ci.yml`
  - Trigger: push, PR
  - Steps: lint, test, build
- Script de deploy simples (ex: `scripts/deploy.sh`)

### 6. Autenticacao/autorizacao

- Setup de auth (`bcrypt`, `jwt`, ou framework equivalente)
- Role base: `admin`, `user`
- Protecao de rotas (middleware de auth)
- Endpoint `POST /auth/login`, `POST /auth/register`

### 7. Convencoes de codigo

- Linter (ESLint / Ruff / Checkstyle)
- Formatter (Prettier / Black)
- Pre-commit hooks (husky + lint-staged ou pre-commit)
- `.editorconfig`
- `CONTRIBUTING.md` com convencoes

### 8. Criar documentacao do setup

No `output_root`:

- `README.md` — como rodar, requisitos, variaveis de ambiente
- `ARCHITECTURE.md` — visao geral da arquitetura
- `CONTRIBUTING.md` — como contribuir, convencoes

### 9. Gerar foundation report

Escreva `_reversa_sdd/evolution/foundation_report.md`:

```markdown
# Foundation Report — <Produto>

## Estrutura Criada
- <lista de diretorios e arquivos principais>

## Stack Configurada
- Frontend: <versao>
- Backend: <versao>
- Banco: <versao>
- ORM: <nome>
- CI/CD: <plataforma>

## Checklist
- [x] Projeto inicializa e compila
- [x] Banco de dados roda
- [x] Health check endpoint responde 200
- [x] CI/CD configurado
- [x] Linter e formatter configurados
- [x] Auth setup
- [x] README, ARCHITECTURE, CONTRIBUTING criados

## Instrucoes para Rodar
1. `cp .env.example .env`
2. `docker compose up -d`
3. `npm run dev`
4. Acesse `http://localhost:<porta>/health`
```

### 10. Salvar checkpoint

```json
"checkpoints": {
  "evoluti_foundation": {
    "completed_at": "<ISO-8601>",
    "output_root": "<caminho>",
    "stack": "<framework>",
    "health_check": "passing",
    "next_phase": "dominio"
  }
}
```

## Criterio de Pronto

- Projeto inicializa e compila sem erros
- Primeira migracao de DB roda
- Health check endpoint responde 200
- CI/CD pipeline configurado (ao menos lint + test)
- Foundation report escrito
- Checkpoint salvo

## Saida

```
<output_root>/  (codigo do novo produto)
_reversa_sdd/evolution/foundation_report.md
```
