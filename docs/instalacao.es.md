# Instalacion

## Requisitos

- Node.js 18+

## Un comando

En la raiz del proyecto heredado:

```bash
npx reversa install
```

El instalador:

1. Detecta motores de IA presentes en el entorno.
2. Pregunta que **Teams** instalar. `Reversa Agents Core` siempre esta incluido; `Migration Agents`, `Code Forward Agents`, `Pricing and Size Agents` y `Product Strategy Agents` vienen marcados; `Translators N8N->Specs->Python` queda desmarcado.
3. Recopila nombre del proyecto, idioma y preferencias.
4. Copia agentes a `.agents/skills/` y `.claude/skills/` cuando Claude Code esta seleccionado.
5. Crea el archivo de entrada del motor (`CLAUDE.md`, `AGENTS.md`, etc.).
6. Crea `.reversa/` con estado, configuracion y plan.
7. Genera un manifiesto SHA-256 para updates seguros.

## Que se crea

```
proyecto-heredado/
├── .reversa/
├── .agents/skills/
├── .claude/skills/
├── CLAUDE.md
├── AGENTS.md
└── _reversa_sdd/
```

!!! success "Tus archivos quedan intactos"
    El instalador solo crea archivos nuevos. Nunca modifica ni elimina archivos existentes del proyecto.
