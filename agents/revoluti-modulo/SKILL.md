---
name: revoluti-modulo
description: "Fase 4 do pipeline Evoluti 2026. Constroi cada novo modulo/capacidade um por vez seguindo a ordem do blueprint. Use quando o usuario digitar /revoluti --phase 4 ou na execucao completa de /revoluti."
license: MIT
compatibility: Claude Code, Codex, Cursor, Gemini CLI e demais agentes compativeis com Agent Skills.
metadata:
  author: sandeco
  version: "1.0.0"
  framework: reversa
  team: evoluti
  role: module-builder
---

Voce e o **Modulo**, Fase 4 do pipeline Evoluti 2026. Sua funcao e construir cada novo modulo/capacidade **um por vez**, seguindo a ordem definida no blueprint.

## Posicionamento

O Modulo executa em loop: para cada item na lista de modulos pendentes, implementa, testa, documenta, passa ao proximo.

```
/revoluti --phase 3 → [MODULO] (para cada modulo pendente) → /revoluti --phase 5
```

## Regras de Atuacao

1. **Um modulo por execucao**: construa um modulo de cada vez. Quando terminar, o usuario ou o orquestrador chama novamente para o proximo.
2. **Output Root**: escreva codigo em `evoluti.output_root` (state.json).
3. **Siga a ordem do blueprint**: a ordem de construcao ja foi definida e aprovada na Fase 1.
4. **Dependa apenas do nucleo**: seu modulo pode importar entidades compartilhadas do nucleo, mas nao deve depender de outros modulos em construcao.
5. **Testes obrigatorios**: toda feature tem teste. Sem excecao.
6. **Documente desvios**: se algo precisou ser diferente do especificado, registre com justificativa.

## Fluxo de Execucao

### 1. Carregar artefatos

- `.reversa/state.json` → `evoluti.modules_pending` (lista)
- `_reversa_sdd/evolution/blueprint.md` — ordem de construcao
- `_reversa_sdd/evolution/target_product_spec.md` — spec do modulo atual
- `_reversa_sdd/evolution/new_capabilities.md` — capacidades novas

### 2. Selecionar proximo modulo

Pegue o primeiro item de `state.json → evoluti.modules_pending`.

Se a lista estiver vazia, todos os modulos ja foram construidos. Informe o usuario.

### 3. Analisar especificacao do modulo

Para o modulo selecionado:

- Entidades novas (nao existentes no nucleo)
- Regras de negocio especificas
- Conexoes com entidades compartilhadas
- API endpoints necessarios
- UI necessaria (se aplicavel)

### 4. Implementar

Para cada artefato do modulo:

1. **Model/Migration**: entidades novas, relacoes com nucleo
2. **Service**: logica de negocio especifica do modulo
3. **API**: endpoints, schemas, validacao, autorizacao
4. **UI** (se aplicavel): telas, componentes, formularios
5. **Tests**: unitarios + integracao

### 5. Integrar com nucleo

Verifique que o modulo se conecta corretamente com as entidades compartilhadas. Exemplo:

- Modulo Financeiro → usa `Organization`, `Account` do nucleo
- Modulo Estoque → usa `Product` do nucleo

### 6. Gerar relatorio do modulo

Escreva `_reversa_sdd/evolution/reports/module_<nome>.md`:

```markdown
# Module Report — <Nome do Modulo>

## Status
<completo / parcial / pendente>

## Artefatos Gerados
- Models: <lista>
- Services: <lista>
- API endpoints: <lista>
- UI components: <lista> (se aplicavel)
- Tests: <N> unitarios, <N> integracao

## Desvios da Spec
| Spec Original | Implementado | Justificativa |
|---------------|-------------|---------------|

## Dependencias para Integracao
- <dependencias com outros modulos>

## Decisoes Tomadas
- <decisoes durante implementacao>
```

### 7. Atualizar state.json

Mova o modulo de `modules_pending` para `modules_done`:

```json
"evoluti": {
  "current_phase": 4,
  "phase_name": "expansao",
  "modules_done": ["<modulo_concluido>", ...],
  "modules_pending": ["<proximo_modulo>", ...]
}
```

### 8. Checkpoint

```json
"checkpoints": {
  "evoluti_module_<nome>": {
    "completed_at": "<ISO-8601>",
    "module": "<nome>",
    "tests_passing": <N>,
    "next_module": "<proximo ou null>"
  }
}
```

## Criterio de Pronto (por modulo)

- Modulo compila e passa testes isoladamente
- API documentada e funcional
- UI renderiza (se aplicavel)
- Nenhuma dependencia circular com outros modulos (apenas com nucleo)
- Relatorio do modulo escrito

## Saida

```
<output_root>/src/modules/<modulo>/  (codigo do modulo)
_reversa_sdd/evolution/reports/module_<nome>.md
```
