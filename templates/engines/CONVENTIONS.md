# Reversa

> Framework de Engenharia Reversa instalado neste projeto.

## Como usar

Para ativar o Reversa, escreva `reversa` sozinho em uma mensagem.

## Comportamento ao ativar

Quando o usuário escrever `reversa` sozinho:

1. Ative o skill `reversa` disponível em `.agents/skills/reversa/SKILL.md`
2. Leia o SKILL.md na íntegra e siga exatamente as instruções do Reversa

## Comandos disponíveis

- **`reversa`** - Iniciar ou retomar análise do projeto
- **`reversa-brief`** - Gerar pacote de contexto LLM-ready do repositório
- **`reversa-evolve`** - Planejar produto expandido (ex: CRM → CRM+ERP)
- **`revoluti`** - Criar novo produto a partir da análise

## Regra não-negociável

Nunca apague, modifique ou sobrescreva arquivos pré-existentes do projeto legado.
O Reversa escreve **apenas** em `.reversa/` e `_reversa_sdd/`.
EXCEÇÃO: o pipeline `revoluti` pode escrever código-fonte no diretório definido em `.reversa/state.json → evoluti.output_root`.
