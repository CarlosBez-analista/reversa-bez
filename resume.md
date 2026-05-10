# Resume: Implementação /reversa-brief e /reversa-evolve

## ✅ Implementado

### 1. Skills Criados
- **`agents/reversa-brief/SKILL.md`** - Skill canônico para gerar pacote LLM-ready do repositório
  - Outputs: `repo_brief.md`, `llm_context_pack.md`, `architecture_digest.md`, `domain_logic_digest.md`, `build_like_this.md`
  - Saída em: `_reversa_sdd/brief/`
  
- **`agents/reversa-evolve/SKILL.md`** - Skill para expansão de produto (ex: CRM → CRM+ERP)
  - Outputs: `product_intent.md`, `current_product_base.md`, `expansion_gap.md`, `target_product_spec.md`, `new_capabilities.md`, `target_product_architecture.md`, `evolution_roadmap.md`, `handoff.md`
  - Saída em: `_reversa_sdd/evolution/`

- **`agents/reversa-extract-soul/SKILL.md`** - Mantido como alias compatível para `reversa-brief`

### 2. Instalador Atualizado
- **`lib/installer/prompts.js`**: Adicionado `PRODUCT_STRATEGY_TEAM` com `reversa-brief`, `reversa-evolve`, `reversa-extract-soul`
- **`lib/commands/install.js`**: Registro do novo time
- **`lib/commands/add-agent.js`**: Labels atualizados para incluir Product Strategy

### 3. Documentação Atualizada
- **README.md**: Mencionados `/reversa-brief` e `/reversa-evolve` como product strategy modes
- **docs/agentes/index.{pt,en,es}.md**: Novo time incluso na lista de agentes
- **docs/instalacao.{pt,en,es}.md**: Product Strategy Agents mencionado como grupo disponível
- **docs/cli.{pt,en,es}.md**: Novos comandos documentados
- **docs/product-strategy/index.{pt,en,es}.md**: Nova seção criada
- **mkdocs.yml**: Navegação atualizada

### 4. Templates de Engine
- **`templates/engines/CLAUDE.md`**: Atualizado com novos comandos
- **`templates/engines/AGENTS.md`**: Atualizado com novos comandos
- **`templates/engines/GEMINI.md`**: Atualizado com novos comandos

---

## ⚠️ Pendente / Verificar

### GitHub Issues - Tracking
- **Bloqueio**: gh CLI precisa de autenticação (`gh auth login`)
- **Commands prontos** mas não executados

Executar após `gh auth login`:

```bash
# Epic 1: Add /reversa-brief as LLM-ready repository brief
gh issue create --repo CarlosBez-analista/reversa-bez \
  --title "Epic: Add /reversa-brief as LLM-ready repository brief" \
  --body "## Summary
Adicionar /reversa-brief como o nome canônico do conceito reversa-extract-soul.

## Checklist
- [ ] Criar skill canônico reversa-brief
- [ ] Migrar conteúdo útil de reversa-extract-soul
- [ ] Manter reversa-extract-soul como alias compatível
- [ ] Definir outputs em _reversa_sdd/brief/
- [ ] Atualizar docs PT/EN/ES e navegação MkDocs
- [ ] Adicionar exemplos de uso no README
- [ ] Testar instalação, add-agent e ativação por comando"

# Epic 2: Add /reversa-evolve product expansion workflow
gh issue create --repo CarlosBez-analista/reversa-bez \
  --title "Epic: Add /reversa-evolve product expansion workflow" \
  --body "## Summary
Criar fluxo para expandir produtos a partir da base analisada (ex: CRM -> CRM+ERP).

## Checklist
- [ ] Criar skill reversa-evolve
- [ ] Definir entrevista de intenção de produto
- [ ] Definir outputs em _reversa_sdd/evolution/
- [ ] Implementar contrato CRM -> CRM+ERP como exemplo-guia
- [ ] Documentar dependência de _reversa_sdd/
- [ ] Gerar handoff para agente codificador
- [ ] Testar fluxo com artefatos mínimos de discovery"

# Epic 3: Register Product Strategy Agents in installer and docs
gh issue create --repo CarlosBez-analista/reversa-bez \
  --title "Epic: Register Product Strategy Agents in installer and docs" \
  --body "## Summary
Registrar o novo time de Product Strategy Agents no instalador e documentação.

## Checklist
- [ ] Adicionar grupo PRODUCT_STRATEGY_TEAM no instalador
- [ ] Marcar o grupo por padrão
- [ ] Atualizar resumo pós-instalação
- [ ] Atualizar add-agent labels
- [ ] Atualizar README e docs de instalação/CLI
- [ ] Atualizar mkdocs.yml
- [ ] Verificar pacote npm inclui novos arquivos"

# Epic 4: Add regression and compatibility tests
gh issue create --repo CarlosBez-analista/reversa-bez \
  --title "Epic: Add regression and compatibility tests" \
  --body "## Summary
Criar testes de regressão e compatibilidade para os novos agentes.

## Checklist
- [ ] Criar teste de instalação em projeto temporário
- [ ] Validar que reversa-brief e reversa-evolve são copiados
- [ ] Validar compatibilidade do alias reversa-extract-soul
- [ ] Validar manifest SHA-256 dos novos arquivos
- [ ] Validar add-agent com os novos agentes
- [ ] Validar que nenhum fluxo escreve fora das pastas Reversa"
```

### Testes
- Teste manual de `npx reversa install` em pasta temporária
- Validação de `npx reversa add-agent` com novos agentes
- Verificar que `package.json.files` cobre novos arquivos
- Build MkDocs (se dependências disponíveis)
- Verificar que fluxo antigo `/reversa-extract-soul` continua funcionando

---

## 📋 Próximos Passos

1. **Autenticar gh** se necessário para criar issues
2. **Rodar testes manuais** de instalação
3. **Executar criação das GitHub Issues** para tracking

---

## 📊 Estatísticas

- Arquivos modificados: 17
- Arquivos criados: ~20 (skills + docs)
- Mudanças: +1473 / -150 linhas (git diff)