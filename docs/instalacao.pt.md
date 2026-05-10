# Instalacao

## Requisitos

- Node.js 18+

## Um comando

Na raiz do projeto legado:

```bash
npx reversa install
```

O instalador:

1. Detecta engines de IA presentes no ambiente.
2. Pergunta quais **Teams** instalar. `Reversa Agents Core` esta sempre incluido; `Migration Agents`, `Code Forward Agents`, `Pricing and Size Agents` e `Product Strategy Agents` vem marcados por padrao; `Translators N8N->Specs->Python` fica desmarcado.
3. Coleta nome do projeto, idioma e preferencias.
4. Copia agentes para `.agents/skills/` e `.claude/skills/` quando Claude Code estiver selecionado.
5. Cria o arquivo de entrada da engine (`CLAUDE.md`, `AGENTS.md`, etc.).
6. Cria `.reversa/` com estado, configuracao e plano.
7. Gera manifesto SHA-256 para updates seguros.

## O que e criado

```
projeto-legado/
├── .reversa/
├── .agents/skills/
├── .claude/skills/
├── CLAUDE.md
├── AGENTS.md
└── _reversa_sdd/
```

!!! success "Seus arquivos ficam intactos"
    O instalador so cria arquivos novos. Ele nao modifica nem apaga arquivos existentes do projeto.

## Instalando em outra engine depois

```bash
npx reversa add-engine
```
