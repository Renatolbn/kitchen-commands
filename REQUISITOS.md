# Kitchen Commands — Requisitos e Regras de Negócio

Este documento reúne os requisitos funcionais, regras de negócio e comportamentos previstos para o sistema **Kitchen Commands**.

Use as caixas de seleção para acompanhar o desenvolvimento:

- `[ ]` Pendente
- `[x]` Concluído

Novos requisitos e decisões podem ser adicionados conforme o projeto evoluir.

---

# 1. User — Autenticação e Autorização

## Autenticação

- [x] Usuário não autenticado não acessa rotas protegidas.
- [ ] Credenciais inválidas devem impedir o login.
- [ ] A senha do usuário não deve ser armazenada em texto puro.

## Autorização / Roles

- [x] `waiter` não consegue administrar o cardápio.
- [x] `kitchen` não consegue abrir comanda.
- [x] `admin` consegue gerenciar o cardápio.
- [ ] As permissões devem ser validadas no backend, independentemente das restrições existentes no frontend.

---

# 2. Table — Mesas

## Estados

- [ ] Uma mesa pode possuir os status `free` e `busy`.
- [ ] Ao abrir uma comanda, a mesa passa para `busy`.
- [ ] Ao fechar a comanda, a mesa retorna para `free`.

## Regras de negócio

- [ ] Uma mesa `busy` não pode possuir uma segunda comanda aberta.
- [ ] Uma mesa `free` pode receber uma nova comanda.

> **Observação:** `calling` não será tratado como status permanente da mesa. A indicação de "CHAMANDO" será derivada da existência de itens `ready` aguardando retirada.

---

# 3. Category — Categorias

## Regras de negócio

- [ ] Não permitir exclusão de categoria que possua itens associados.

## Decisões relacionadas

- [ ] Definir se será utilizada exclusão física ou exclusão lógica para categorias.
- [ ] Definir o comportamento dos `MenuItems` associados a uma categoria inativa, caso seja utilizada exclusão lógica.

---

# 4. MenuItem — Cardápio

## Regras de negócio

- [ ] Não é possível adicionar item inexistente à comanda.
- [ ] Não é possível adicionar item indisponível à comanda.
- [ ] O preço do item é registrado no momento em que ele é adicionado à comanda.
- [ ] Tornar um `MenuItem` indisponível não deve alterar `OrderItems` já existentes.
- [ ] Um `MenuItem` excluído ou desativado não deve alterar o histórico das comandas que já utilizaram esse item.

---

# 5. Order — Comanda

## Criação

- [ ] Não é possível abrir comanda em mesa ocupada.
- [ ] Uma comanda deve estar vinculada a uma única mesa.
- [ ] Uma mesa pode possuir somente uma comanda aberta por vez.
- [ ] Uma nova `Order` deve iniciar com status `open`.

## Status

Fluxo esperado:

```text
open
  ↓
closed
```

Regras:

- [ ] Uma `Order` aberta pode receber novos itens.
- [ ] Uma `Order` `closed` não pode receber novos itens.
- [ ] Uma `Order` fechada não pode voltar para `open`.

## Itens

- [ ] Uma comanda deve possuir pelo menos um item antes de ser fechada.
- [ ] Não é possível fechar comanda com itens ainda não finalizados.
- [ ] É possível adicionar itens a uma comanda enquanto ela estiver `open`.
- [ ] É possível adicionar novos itens mesmo após a comanda já ter sido enviada para a cozinha.
- [ ] Itens adicionados após o envio inicial devem pertencer a um novo lote de produção.
- [ ] Um novo lote não deve alterar ou interromper o processamento dos lotes anteriores.
- [ ] Novos lotes devem ser enviados ao final da fila de produção da cozinha.

## Valores

- [ ] O total da comanda é calculado pelo backend.
- [ ] O frontend não pode definir o valor final da comanda.
- [ ] A taxa de serviço, quando aplicável, é calculada pelo backend.
- [ ] O valor de cada item da comanda deve ser calculado utilizando o preço registrado no `OrderItem`.
- [ ] Alterações futuras no preço do `MenuItem` não devem modificar o preço registrado em `OrderItems` existentes.

## Fechamento

- [ ] Ao fechar a comanda, o status da `Order` passa para `closed`.
- [ ] Não é possível fechar uma comanda que possua itens ainda não entregues ou cancelados.
- [ ] Ao fechar a comanda, a mesa volta para `free`.
- [ ] Uma comanda `closed` não pode receber novos itens.

---

# 6. OrderItem — Itens da Comanda

## Criação

- [ ] A quantidade deve ser maior que `0`.
- [ ] O `OrderItem` começa com status `pending`.
- [ ] O `MenuItem` informado deve existir.
- [ ] O `MenuItem` deve estar disponível.
- [ ] O preço praticado deve ser armazenado no `OrderItem`.
- [ ] O `OrderItem` deve estar associado a um lote de produção.

---

## Alteração

- [ ] Um item `pending` pode ter sua quantidade alterada.
- [ ] Um item `pending` pode ser removido.
- [ ] Um item não pode ser modificado após entrar em `in_progress`.
- [ ] Um item `in_progress` não pode ter sua quantidade alterada.
- [ ] Um item `in_progress` não pode ser removido.
- [ ] Um item `ready` não pode ser modificado.
- [ ] Um item `delivered` não pode ser modificado.

---

## Lotes de produção

Cada envio de itens para a cozinha representa um lote de produção.

Exemplo:

```text
COMANDA #105 — MESA 04

LOTE 01
├── 2x Hambúrguer
├── 1x Batata
└── 2x Refrigerante

        ↓ enviado primeiro

LOTE 02
├── 1x Sobremesa
└── 1x Café

        ↓ enviado depois
```

Regras:

- [ ] Uma comanda pode possuir múltiplos lotes de produção.
- [ ] Cada envio de itens para a cozinha deve gerar um novo lote.
- [ ] Cada `OrderItem` deve pertencer a um único lote.
- [ ] A ordem de criação dos lotes deve ser preservada.
- [ ] Um novo lote não deve interromper o processamento de lotes anteriores.
- [ ] Novos lotes devem entrar no final da fila de produção.

---

## Transição de status

Fluxo esperado:

```text
pending
   ↓
in_progress
   ↓
ready
   ↓
delivered
```

### Regras

- [ ] `pending → in_progress` é permitido para `kitchen`.
- [ ] `in_progress → ready` é permitido para `kitchen`.
- [ ] `ready → delivered` é permitido mediante confirmação de retirada/entrega.
- [ ] Não é possível pular estados.
- [ ] Não é possível retornar um item para um estado anterior.
- [ ] Não é possível alterar um item `delivered` para outro estado.

---

## Cancelamento

O cancelamento é tratado como uma exceção ao fluxo normal de produção.

- [ ] Um item `pending` pode ser cancelado.
- [ ] Um item `in_progress` não pode ser cancelado diretamente.
- [ ] O cancelamento de um item em produção deve exigir uma ação autorizada específica.
- [ ] Um item `ready` não pode ser cancelado.
- [ ] Um item `delivered` não pode ser cancelado.
- [ ] O cancelamento de um item pode exigir o registro de um motivo.

---

# 7. Kitchen — Produção

## Fila de produção

- [ ] A cozinha deve processar os lotes respeitando sua ordem de entrada.
- [ ] Um novo lote deve ser colocado no final da fila.
- [ ] Um lote em produção não deve ser interrompido pela chegada de um novo lote.
- [ ] Os itens devem permanecer vinculados à comanda e ao lote de origem.

## Itens em produção

- [ ] A cozinha pode iniciar a produção de um item `pending`.
- [ ] Ao iniciar a produção, o item passa para `in_progress`.
- [ ] Ao finalizar a produção, o item passa para `ready`.
- [ ] Um item `in_progress` não pode ser alterado pelo garçom.
- [ ] Um item `ready` deve ficar disponível para retirada.

---

# 8. Order Pickup — Retirada

## Itens prontos

- [ ] Quando um `OrderItem` passar para `ready`, o sistema deve sinalizar que existe um item pronto para retirada.
- [ ] O garçom deve conseguir identificar a mesa relacionada ao item pronto.
- [ ] O garçom deve conseguir identificar quais itens estão prontos.
- [ ] Enquanto houver itens `ready` aguardando retirada, a mesa deve apresentar visualmente a indicação de `CHAMANDO`.
- [ ] O garçom deve conseguir identificar se o pedido está parcialmente ou totalmente pronto.
- [ ] Após a retirada/entrega, o `OrderItem` passa para `delivered`.
- [ ] Quando não houver mais itens `ready` aguardando retirada, a indicação de `CHAMANDO` deve ser removida.

## Fluxo

```text
Item pronto
     ↓
READY
     ↓
Sistema identifica item pronto
     ↓
Mesa apresenta "CHAMANDO"
     ↓
Garçom identifica mesa e itens
     ↓
Retirada / entrega
     ↓
DELIVERED
     ↓
Se não houver mais itens prontos
     ↓
Remove "CHAMANDO"
```

---

# 9. Socket.io — Tempo Real

O Socket.io será utilizado para comunicar alterações relevantes entre backend e frontend em tempo real.

## Eventos

- [ ] Alteração de status de `OrderItem` deve gerar o evento `item_status_updated`.
- [ ] O KDS deve receber alterações de status em tempo real.
- [ ] O painel do garçom deve receber alterações relevantes em tempo real.
- [ ] A criação de um novo lote deve poder ser comunicada ao KDS em tempo real.
- [ ] Alterações relevantes da `Order` devem poder ser comunicadas em tempo real.
- [ ] Alterações relevantes da `Table` devem poder ser comunicadas em tempo real.

## Eventos previstos

```text
item_status_updated
batch_created
order_updated
table_status_updated
```

> Os eventos adicionais podem ser implementados conforme a necessidade do MVP e a evolução do sistema.

---

# Fluxos principais

## Fluxo 1 — Login

```text
Usuário
   ↓
Login
   ↓
Autenticação
   ↓
Identificação do role
   ↓
Painel correspondente
```

- [ ] Implementado

---

## Fluxo 2 — Abrir comanda

```text
Waiter
   ↓
Seleciona mesa
   ↓
Backend verifica se está livre
   ↓
Cria Order
   ↓
Order = open
   ↓
Mesa = busy
```

- [ ] Implementado

---

## Fluxo 3 — Adicionar item

```text
Waiter
   ↓
Seleciona MenuItem
   ↓
Backend verifica existência
   ↓
Backend verifica disponibilidade
   ↓
Verifica quantidade
   ↓
Registra preço atual
   ↓
Cria OrderItem
   ↓
OrderItem = pending
```

- [ ] Implementado

---

## Fluxo 4 — Adicionar itens após envio

```text
Waiter
   ↓
Seleciona comanda aberta
   ↓
Adiciona novos itens
   ↓
Backend valida os itens
   ↓
Cria novo lote
   ↓
Cria OrderItems
   ↓
OrderItems = pending
   ↓
Lote entra no final da fila
   ↓
Kitchen recebe novo lote
```

- [ ] Implementado

---

## Fluxo 5 — Preparação na cozinha

```text
OrderItem
   ↓
pending
   ↓
in_progress
   ↓
ready
```

- [ ] Implementado

---

## Fluxo 6 — Item pronto e retirada

```text
OrderItem
   ↓
ready
   ↓
Sistema identifica item pronto
   ↓
Garçom recebe atualização
   ↓
Mesa apresenta "CHAMANDO"
   ↓
Garçom identifica item
   ↓
Retirada / entrega
   ↓
OrderItem = delivered
```

- [ ] Implementado

---

## Fluxo 7 — Fechar comanda

```text
Waiter
   ↓
Solicita fechamento
   ↓
Backend verifica se Order está aberta
   ↓
Backend verifica existência de itens
   ↓
Backend verifica itens não finalizados
   ↓
Calcula total
   ↓
Order = closed
   ↓
Table = free
```

- [ ] Implementado

---

# Requisitos futuros

Use esta seção para registrar regras que surgirem durante o desenvolvimento.

- [ ]

---

# Decisões de negócio pendentes

As decisões abaixo devem ser definidas antes ou durante a implementação das funcionalidades relacionadas.

- [ ] O Admin poderá visualizar e/ou gerenciar comandas?
- [ ] O garçom poderá cancelar um `OrderItem` depois que ele for enviado à cozinha?
- [ ] Quem poderá cancelar um `OrderItem` que esteja `in_progress`?
- [ ] O cancelamento de um item em produção exigirá justificativa?
- [ ] O que acontece quando um `MenuItem` é excluído enquanto existem comandas antigas utilizando esse item?
- [ ] Será permitido ter mais de uma comanda aberta na mesma mesa?
- [ ] Como será tratado o cancelamento de uma `Order`?
- [ ] Será permitido fechar uma comanda que contenha itens `cancelled`?
- [ ] O fechamento da comanda exigirá que todos os itens estejam `delivered` ou `cancelled`?
- [ ] O status da `Order` será atualizado automaticamente com base nos `OrderItems`?
- [ ] O sistema trabalhará com lotes como entidade própria ou apenas como agrupamento lógico dos `OrderItems`?
- [ ] Um lote poderá ser parcialmente entregue?
- [ ] A cozinha visualizará os pedidos agrupados por comanda, lote ou ambos?
- [ ] O sistema permitirá diferentes modos de chamada, como chamar item a item ou somente quando o lote estiver completo?

---

# Histórico de alterações

| Data | Alteração |
|---|---|
| 21/08/2026 | Criação do documento |
| 31/08/2026 | Revisão geral das regras de negócio |
| 31/08/2026 | Inclusão de lotes de produção |
| 31/08/2026 | Inclusão do fluxo de novos itens em comandas já enviadas |
| 31/08/2026 | Inclusão do fluxo de retirada e indicação `CHAMANDO` |
| 31/08/2026 | Separação entre `Order Pickup` e `Socket.io` |
| 31/08/2026 | Revisão dos estados de `Order` e `OrderItem` |