# Kitchen Commands — Requisitos e Regras de Negócio

Este documento reúne os requisitos funcionais, regras de negócio e comportamentos previstos para o sistema **Kitchen Commands**.

O projeto será desenvolvido inicialmente com foco em um **MVP funcional para portfólio**, priorizando os principais fluxos operacionais do restaurante.

Funcionalidades mais avançadas serão mantidas como **funcionalidades futuras**, podendo ser implementadas posteriormente sem comprometer a conclusão da versão inicial.

---

# 1. Objetivo do MVP

O MVP deve permitir que o sistema execute o fluxo principal de operação do restaurante:

```text
Login
  ↓
Identificação do usuário
  ↓
Painel conforme role
  ↓
Garçom seleciona mesa
  ↓
Abre comanda
  ↓
Adiciona itens
  ↓
Pedido é enviado para a cozinha
  ↓
KDS recebe os itens
  ↓
Cozinha prepara
  ↓
Item fica pronto
  ↓
Garçom recebe atualização
  ↓
Item é entregue
  ↓
Comanda é fechada
  ↓
Mesa volta para livre
```

O MVP deve priorizar:

- Autenticação
- Autorização por roles
- Gerenciamento básico de cardápio
- Gerenciamento de mesas
- Abertura e gerenciamento de comandas
- Adição de itens
- Controle de status dos itens
- KDS
- Comunicação em tempo real com Socket.io
- Entrega dos itens
- Fechamento da comanda
- Cálculo do total no backend

---

# 2. User — Autenticação e Autorização

## 2.1 Autenticação

- [ ] Usuário não autenticado não acessa rotas protegidas.
- [ ] Credenciais inválidas devem impedir o login.
- [ ] A senha do usuário não deve ser armazenada em texto puro.
- [ ] O sistema deve identificar o usuário autenticado.
- [ ] O sistema deve identificar o `role` do usuário.

## 2.2 Roles

O sistema possuirá inicialmente três roles:

```text
admin
waiter
kitchen
```

### Regras

- [ ] `waiter` não consegue administrar o cardápio.
- [ ] `kitchen` não consegue abrir comanda.
- [ ] `admin` consegue gerenciar o cardápio.
- [ ] `admin` consegue criar, editar e gerenciar usuários.
- [ ] As permissões devem ser validadas no backend, independentemente das restrições existentes no frontend.

## 2.3 Fluxo de login

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

- [ ] Implementar fluxo completo de login no frontend.
- [ ] Redirecionar o usuário para o painel correspondente ao seu `role`.

## 2.4 User — Gerenciamento de Usuários

### 2.4.1 Criação de Usuários

- [ ] Apenas o `admin` pode criar novos usuários.
- [ ] O `admin` deve definir `username`, `senha` e `role` no momento da criação.
- [ ] A senha deve ser armazenada com hash, mesmo quando criada pelo admin.
- [ ] `waiter` e `kitchen` não podem criar usuários.

### 2.4.2 Regras

- [ ] Não permitir criação de usuário com `username` duplicado.
- [ ] Não permitir criação de usuário sem `role` definida.
- [ ] O `admin` pode visualizar a lista de usuários existentes.
- [ ] O `admin` pode editar o `role` de um usuário existente.
- [ ] O `admin` pode desativar um usuário (exclusão lógica).
- [ ] Usuário desativado não consegue mais fazer login.

### 2.4.3 Fluxo

```text
Admin
  ↓
Acessa gestão de usuários
  ↓
Cria novo usuário
  ↓
Define username, senha e role
  ↓
Backend valida dados
  ↓
Backend aplica hash na senha
  ↓
Usuário criado
  ↓
Usuário pode fazer login
```

---

# 3. Table — Mesas

## 3.1 Estados

O MVP utilizará apenas dois estados permanentes para as mesas:

```text
free
busy
```

- [ ] Uma mesa pode possuir os status `free` e `busy`.
- [ ] Ao abrir uma comanda, a mesa passa para `busy`.
- [ ] Ao fechar a comanda, a mesa retorna para `free`.

A indicação de `CHAMANDO` não será tratada como um status permanente da mesa.

Quando implementada, ela será derivada da existência de itens `ready` aguardando retirada.

## 3.2 Regras de negócio

- [ ] Uma mesa `busy` não pode possuir uma segunda comanda aberta.
- [ ] Uma mesa `free` pode receber uma nova comanda.

## 3.3 Fluxo

```text
Mesa = free
     ↓
Abertura da comanda
     ↓
Mesa = busy
     ↓
Fechamento da comanda
     ↓
Mesa = free
```

---

# 4. Category — Categorias

## 4.1 MVP

O Admin deve conseguir gerenciar categorias utilizadas pelo cardápio.

- [ ] Criar categoria.
- [ ] Listar categorias.
- [ ] Editar categoria.
- [ ] Excluir categoria.

## 4.2 Regras

- [ ] Não permitir exclusão de categoria que possua itens associados.

---

# 5. MenuItem — Cardápio

## 5.1 MVP

O Admin deve conseguir gerenciar os itens do cardápio.

- [ ] Criar `MenuItem`.
- [ ] Listar `MenuItems`.
- [ ] Editar `MenuItem`.
- [ ] Alterar disponibilidade do `MenuItem`.
- [ ] Excluir ou desativar `MenuItem`.

## 5.2 Regras de negócio

- [ ] Não é possível adicionar item inexistente à comanda.
- [ ] Não é possível adicionar item indisponível à comanda.
- [ ] O preço do item é registrado no momento em que ele é adicionado à comanda.
- [ ] Tornar um `MenuItem` indisponível não deve alterar `OrderItems` já existentes.
- [ ] Alterações futuras no preço do `MenuItem` não devem modificar preços registrados em `OrderItems` existentes.

---

# 6. Order — Comanda

## 6.1 Criação

- [ ] Não é possível abrir comanda em mesa ocupada.
- [ ] Uma comanda deve estar vinculada a uma única mesa.
- [ ] Uma mesa pode possuir somente uma comanda aberta por vez.
- [ ] Uma nova `Order` deve iniciar com status `open`.

## 6.2 Status

Fluxo do MVP:

```text
open
  ↓
closed
```

### Regras

- [ ] Uma `Order` aberta pode receber novos itens.
- [ ] Uma `Order` `closed` não pode receber novos itens.
- [ ] Uma `Order` fechada não pode voltar para `open`.

## 6.3 Itens

- [ ] Uma comanda deve possuir pelo menos um item antes de ser fechada.
- [ ] É possível adicionar itens a uma comanda enquanto ela estiver `open`.
- [ ] O frontend não pode definir o valor final da comanda.
- [ ] O total da comanda deve ser calculado pelo backend.
- [ ] O valor de cada item deve utilizar o preço registrado no `OrderItem`.

## 6.4 Fechamento

Para o MVP, uma comanda somente poderá ser fechada quando todos os seus itens estiverem finalizados.

Fluxo:

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

Regras:

- [ ] Não é possível fechar uma comanda que possua itens ainda não finalizados.
- [ ] Ao fechar a comanda, o status da `Order` passa para `closed`.
- [ ] Ao fechar a comanda, a mesa volta para `free`.
- [ ] Uma comanda `closed` não pode receber novos itens.

---

# 7. OrderItem — Itens da Comanda

## 7.1 Criação

- [ ] A quantidade deve ser maior que `0`.
- [ ] O `OrderItem` começa com status `pending`.
- [ ] O `MenuItem` informado deve existir.
- [ ] O `MenuItem` deve estar disponível.
- [ ] O preço praticado deve ser armazenado no `OrderItem`.

## 7.2 Alteração

Enquanto o item estiver `pending`:

- [ ] Um item `pending` pode ter sua quantidade alterada.
- [ ] Um item `pending` pode ser removido.

Depois que entrar em produção:

- [ ] Um item não pode ser modificado após entrar em `in_progress`.
- [ ] Um item `in_progress` não pode ter sua quantidade alterada.
- [ ] Um item `in_progress` não pode ser removido.
- [ ] Um item `ready` não pode ser modificado.
- [ ] Um item `delivered` não pode ser modificado.

---

# 8. OrderItem — Transição de Status

## 8.1 Fluxo do MVP

```text
pending
   ↓
in_progress
   ↓
ready
   ↓
delivered
```

## 8.2 Regras

- [ ] `pending → in_progress` é permitido para `kitchen`.
- [ ] `in_progress → ready` é permitido para `kitchen`.
- [ ] `ready → delivered` é permitido mediante confirmação de retirada/entrega.
- [ ] Não é possível pular estados.
- [ ] Não é possível retornar um item para um estado anterior.
- [ ] Não é possível alterar um item `delivered` para outro estado.

---

# 9. Kitchen — Produção

## 9.1 KDS

O sistema deve possuir um painel para a cozinha — **Kitchen Display System (KDS)**.

A cozinha deve conseguir visualizar os itens que precisam ser preparados.

Exemplo:

```text
┌───────────────────────────────┐
│         MESA 04               │
│                               │
│  2x Hambúrguer                │
│  1x Batata                    │
│  2x Refrigerante              │
│                               │
│  STATUS: PENDENTE             │
│                               │
│       [ INICIAR ]             │
└───────────────────────────────┘
```

## 9.2 Produção

- [ ] A cozinha pode visualizar itens `pending`.
- [ ] A cozinha pode iniciar a produção de um item `pending`.
- [ ] Ao iniciar a produção, o item passa para `in_progress`.
- [ ] Ao finalizar a produção, o item passa para `ready`.
- [ ] Um item `in_progress` não pode ser alterado pelo garçom.
- [ ] Um item `ready` deve ficar disponível para retirada.

---

# 10. Order Pickup — Retirada

A funcionalidade de retirada faz parte do fluxo principal do MVP.

## 10.1 Itens prontos

- [ ] Quando um `OrderItem` passar para `ready`, o sistema deve identificar que existe um item pronto para retirada.
- [ ] O garçom deve conseguir identificar a mesa relacionada ao item pronto.
- [ ] O garçom deve conseguir identificar quais itens estão prontos.
- [ ] O garçom deve conseguir identificar se o pedido está parcialmente ou totalmente pronto.
- [ ] Após a retirada/entrega, o `OrderItem` passa para `delivered`.

## 10.2 Indicação CHAMANDO

Enquanto houver itens `ready` aguardando retirada, a mesa deve apresentar visualmente:

```text
CHAMANDO
```

Quando não houver mais itens `ready` aguardando retirada, a indicação deve desaparecer.

## 10.3 Fluxo

```text
Item pronto
     ↓
READY
     ↓
Sistema identifica item pronto
     ↓
Garçom recebe atualização
     ↓
Mesa apresenta "CHAMANDO"
     ↓
Garçom identifica mesa e item
     ↓
Retirada / entrega
     ↓
DELIVERED
     ↓
Não existem mais itens READY
     ↓
Remove "CHAMANDO"
```

---

# 11. Socket.io — Tempo Real

O Socket.io será utilizado para comunicar alterações relevantes entre backend e frontend em tempo real.

## 11.1 Eventos do MVP

- [ ] Alteração de status de `OrderItem` deve gerar o evento `item_status_updated`.
- [ ] O KDS deve receber alterações de status em tempo real.
- [ ] O painel do garçom deve receber alterações relevantes em tempo real.
- [ ] Alterações relevantes da `Table` devem poder ser comunicadas em tempo real.

## 11.2 Eventos previstos

```text
item_status_updated
table_status_updated
```

Eventos adicionais poderão ser adicionados conforme a evolução do sistema.

---

# 12. Fluxos principais do MVP

## 12.1 Fluxo 1 — Login

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

- [ ] Implementar

---

## 12.2 Fluxo 2 — Abrir comanda

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

- [ ] Implementar

---

## 12.3 Fluxo 3 — Adicionar item

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

- [ ] Implementar

---

## 12.4 Fluxo 4 — Preparação na cozinha

```text
OrderItem
   ↓
pending
   ↓
in_progress
   ↓
ready
```

- [ ] Implementar

---

## 12.5 Fluxo 5 — Item pronto e retirada

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

- [ ] Implementar

---

## 12.6 Fluxo 6 — Fechar comanda

```text
Waiter
   ↓
Solicita fechamento
   ↓
Backend verifica Order
   ↓
Backend verifica itens
   ↓
Calcula total
   ↓
Order = closed
   ↓
Table = free
```

- [ ] Implementar

---

# 13. Funcionalidades Futuras

As funcionalidades abaixo **não fazem parte do MVP inicial**.

Elas poderão ser implementadas depois que o fluxo principal estiver funcionando de ponta a ponta.

---

## 13.1 Lotes de produção

Cada envio de itens para a cozinha poderá representar um lote de produção.

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

Requisitos futuros:

- [ ] Uma comanda pode possuir múltiplos lotes de produção.
- [ ] Cada envio de itens para a cozinha deve gerar um novo lote.
- [ ] Cada `OrderItem` deve pertencer a um único lote.
- [ ] A ordem de criação dos lotes deve ser preservada.
- [ ] Um novo lote não deve interromper o processamento de lotes anteriores.
- [ ] Novos lotes devem entrar no final da fila de produção.
- [ ] A cozinha deve processar os lotes respeitando sua ordem de entrada.
- [ ] Os itens devem permanecer vinculados à comanda e ao lote de origem.

---

## 13.2 Adição de itens após envio para cozinha

No futuro, uma comanda poderá receber novos itens mesmo depois de seu primeiro envio à cozinha.

Fluxo:

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

Requisitos:

- [ ] É possível adicionar novos itens mesmo após a comanda já ter sido enviada para a cozinha.
- [ ] Itens adicionados após o envio inicial devem pertencer a um novo lote.
- [ ] Um novo lote não deve alterar ou interromper o processamento dos lotes anteriores.
- [ ] Novos lotes devem ser enviados ao final da fila de produção da cozinha.

---

## 13.3 Cancelamento de itens

O cancelamento será tratado como uma exceção ao fluxo normal de produção.

Requisitos futuros:

- [ ] Um item `pending` pode ser cancelado.
- [ ] Um item `in_progress` não pode ser cancelado diretamente.
- [ ] O cancelamento de um item em produção deve exigir uma ação autorizada específica.
- [ ] Um item `ready` não pode ser cancelado.
- [ ] Um item `delivered` não pode ser cancelado.
- [ ] O cancelamento de um item pode exigir o registro de um motivo.

---

## 13.4 Eventos Socket.io adicionais

Conforme a implementação dos lotes e outras funcionalidades, novos eventos poderão ser adicionados:

```text
item_status_updated
batch_created
order_updated
table_status_updated
```

Requisitos futuros:

- [ ] `batch_created`
- [ ] `order_updated`
- [ ] Comunicação de novos lotes com o KDS.
- [ ] Comunicação de alterações relevantes da `Order`.
- [ ] Comunicação de alterações relevantes da `Table`.

---

# 14. Decisões de negócio futuras

As decisões abaixo não precisam bloquear o MVP e deverão ser definidas quando as respectivas funcionalidades forem implementadas.

## Administração

- [ ] O Admin poderá visualizar e/ou gerenciar comandas?

## Cancelamento

- [ ] O garçom poderá cancelar um `OrderItem` depois que ele for enviado à cozinha?
- [ ] Quem poderá cancelar um `OrderItem` que esteja `in_progress`?
- [ ] O cancelamento de um item em produção exigirá justificativa?

## Cardápio

- [ ] Será utilizada exclusão física ou exclusão lógica para categorias?
- [ ] Qual será o comportamento dos `MenuItems` associados a uma categoria inativa?
- [ ] O que acontece quando um `MenuItem` é excluído enquanto existem comandas antigas utilizando esse item?
- [ ] Como preservar o histórico das comandas relacionadas a itens excluídos ou desativados?

## Comandas

- [ ] Será permitido ter mais de uma comanda aberta na mesma mesa?
- [ ] Como será tratado o cancelamento de uma `Order`?
- [ ] Será permitido fechar uma comanda que contenha itens `cancelled`?
- [ ] O fechamento da comanda exigirá que todos os itens estejam `delivered` ou `cancelled`?
- [ ] O status da `Order` será atualizado automaticamente com base nos `OrderItems`?

## Lotes

- [ ] O sistema trabalhará com lotes como entidade própria ou apenas como agrupamento lógico dos `OrderItems`?
- [ ] Um lote poderá ser parcialmente entregue?
- [ ] A cozinha visualizará os pedidos agrupados por comanda, lote ou ambos?
- [ ] Novos itens serão sempre enviados para o final da fila?

## Retirada

- [ ] Será permitido ter diferentes modos de chamada?
- [ ] O sistema chamará item a item ou somente quando o lote estiver completo?
- [ ] Como tratar pedidos parcialmente prontos?

---

# 15. Requisitos de qualidade do projeto

Além das funcionalidades, o projeto deve demonstrar boas práticas de desenvolvimento.

## Backend

- [ ] Separação adequada entre rotas, controllers, regras de negócio e acesso aos dados.
- [ ] Validação dos dados recebidos.
- [ ] Tratamento adequado de erros.
- [ ] Regras de negócio protegidas no backend.
- [ ] Autenticação e autorização.
- [ ] Senhas armazenadas com hash.
- [ ] Cálculos financeiros realizados no backend.
- [ ] Apenas admin pode criar usuários.

## Frontend

- [ ] Componentização adequada.
- [ ] Gerenciamento adequado de estado.
- [ ] Tratamento de estados de carregamento.
- [ ] Tratamento de erros da API.
- [ ] Interface responsiva.
- [ ] Restrição visual das funcionalidades de acordo com o `role`, sem depender dela para segurança.

## Comunicação

- [ ] API REST funcionando corretamente.
- [ ] Comunicação em tempo real com Socket.io.
- [ ] Atualizações relevantes refletidas no frontend sem necessidade de atualização manual da página.

---

# 16. Testes

Os testes devem priorizar principalmente as regras de negócio críticas.

## Testes prioritários

- [ ] Usuário não autenticado não consegue acessar rota protegida.
- [ ] Usuário com `role` inadequado não consegue acessar determinada funcionalidade.
- [ ] Apenas `admin` consegue criar novos usuários. 
- [ ] Não é possível criar usuário com username duplicado.
- [ ] Senha é armazenada com hash mesmo quando criada pelo admin.
- [ ] Não é possível abrir comanda em mesa ocupada.
- [ ] Não é possível adicionar produto inexistente.
- [ ] Não é possível adicionar produto indisponível.
- [ ] Não é possível adicionar quantidade menor ou igual a zero.
- [ ] `OrderItem` inicia como `pending`.
- [ ] Não é possível pular estados do `OrderItem`.
- [ ] Não é possível voltar para um estado anterior.
- [ ] Não é possível alterar item após entrar em produção.
- [ ] Não é possível fechar comanda com itens não finalizados.
- [ ] O total da comanda é calculado pelo backend.
- [ ] Fechar a comanda libera a mesa.
- [ ] O preço histórico do `OrderItem` não muda quando o preço do `MenuItem` é alterado.

---

# 17. Critério para considerar o MVP concluído

O MVP poderá ser considerado concluído quando for possível executar o seguinte cenário sem intervenção manual no banco de dados:

```text
1. Usuário faz login
        ↓
2. Sistema identifica o role
        ↓
3. Garçom acessa o painel
        ↓
4. Garçom visualiza as mesas
        ↓
5. Seleciona uma mesa livre
        ↓
6. Abre uma comanda
        ↓
7. Mesa passa para busy
        ↓
8. Garçom adiciona itens
        ↓
9. Itens ficam pending
        ↓
10. Cozinha recebe os itens
        ↓
11. Cozinha inicia produção
        ↓
12. Itens passam para in_progress
        ↓
13. Cozinha finaliza produção
        ↓
14. Itens passam para ready
        ↓
15. Garçom recebe atualização em tempo real
        ↓
16. Sistema indica CHAMANDO
        ↓
17. Garçom realiza a entrega
        ↓
18. Itens passam para delivered
        ↓
19. Garçom fecha a comanda
        ↓
20. Backend calcula o total
        ↓
21. Order passa para closed
        ↓
22. Mesa passa para free
```

---

# 18. Fora do escopo do MVP

Para evitar aumento excessivo de escopo, as seguintes funcionalidades não fazem parte da versão inicial:

```text
- Gestão avançada de estoque
- QR Code para estoque
- Controle de produção de ingredientes
- Fichas técnicas
- Compras e fornecedores
- Gestão financeira avançada
- Relatórios avançados
- Integração com pagamentos
- Integração com impressoras térmicas
- Aplicativo mobile
- Microservices
- Outras integrações externas
```

Essas funcionalidades poderão ser avaliadas posteriormente conforme a evolução do projeto.

---

# 19. Histórico de alterações

| Data | Alteração |
|---|---|
| 21/08/2026 | Criação do documento |
| 31/08/2026 | Revisão geral das regras de negócio |
| 31/08/2026 | Inclusão de lotes de produção |
| 31/08/2026 | Inclusão do fluxo de novos itens em comandas já enviadas |
| 31/08/2026 | Inclusão do fluxo de retirada e indicação `CHAMANDO` |
| 31/08/2026 | Separação entre `Order Pickup` e `Socket.io` |
| 31/08/2026 | Revisão dos estados de `Order` e `OrderItem` |
| 01/09/2026 | Reorganização do escopo em MVP e funcionalidades futuras |
| 01/09/2026 | Inclusão de critérios de conclusão do MVP |
| 01/09/2026 | Inclusão de requisitos de qualidade e testes |
