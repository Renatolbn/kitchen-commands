# 🍽️ Kitchen Commands API

API REST para gerenciamento de comandas de cozinha, desenvolvida com Node.js, Express e MongoDB.

## 📋 Sobre o projeto

O Kitchen Commands é um sistema de comandas desenvolvido para restaurantes, bares e dark kitchens. O sistema permite que garçons abram comandas, a cozinha gerencie os pedidos em tempo real e o administrador gerencie o cardápio e as mesas.

O projeto nasceu da combinação de dois mundos: mais de 10 anos de experiência como chef de cozinha e o aprendizado em desenvolvimento de software — o que trouxe uma visão única sobre os problemas reais do dia a dia de uma cozinha.

---

## 🚀 Tecnologias

- **Node.js** — ambiente de execução
- **Express** — framework web
- **MongoDB** — banco de dados
- **Mongoose** — ODM para MongoDB
- **JWT** — autenticação
- **Bcrypt** — hash de senhas
- **Socket.io** — comunicação em tempo real
- **Dotenv** — variáveis de ambiente

---

## ✅ Funcionalidades

- Autenticação e autorização por roles (admin, waiter, kitchen)
- Gerenciamento de cardápio (categorias e itens)
- Gerenciamento de mesas
- Abertura e fechamento de comandas
- Atualização de status dos itens em tempo real via Socket.io
- Cálculo automático do total ao fechar a comanda
- Atualização automática do status da mesa ao abrir/fechar comanda

---

## 🔐 Roles e permissões

| Role | Permissões |
|---|---|
| `admin` | Gerencia cardápio, categorias e mesas |
| `waiter` | Abre e gerencia comandas |
| `kitchen` | Visualiza pedidos e atualiza status dos itens |

---

## ⚙️ Como rodar localmente

### Pré-requisitos

- Node.js >= 18
- MongoDB instalado e rodando localmente

### Instalação

```bash
# Clone o repositório
git clone https://github.com/Renatolbn/kitchen-commands.git

# Entre na pasta
cd kitchen-commands

# Instale as dependências
npm install
```

### Configuração

Crie um arquivo `.env` na raiz do projeto:

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/kitchen-commands
JWT_SECRET=sua_chave_secreta_aqui
```

### Rodando o projeto

```bash
npm run dev
```

O servidor vai rodar em `http://localhost:3000`

---

## 📡 Rotas da API

### Usuários
| Método | Rota | Descrição | Auth |
|---|---|---|---|
| POST | `/api/users/login` | Login | ❌ |
| POST | `/api/users` | Criar usuário | ✅ admin |
| GET | `/api/users` | Listar usuários | ✅ admin |
| DELETE | `/api/users/:id` | Remover usuário | ✅ admin |

### Categorias
| Método | Rota | Descrição | Auth |
|---|---|---|---|
| GET | `/api/categories` | Listar categorias | ✅ |
| POST | `/api/categories` | Criar categoria | ✅ admin |
| PUT | `/api/categories/:id` | Atualizar categoria | ✅ admin |
| DELETE | `/api/categories/:id` | Remover categoria | ✅ admin |

### Cardápio
| Método | Rota | Descrição | Auth |
|---|---|---|---|
| GET | `/api/menu-items` | Listar itens | ✅ |
| POST | `/api/menu-items` | Criar item | ✅ admin |
| PUT | `/api/menu-items/:id` | Atualizar item | ✅ admin |
| PATCH | `/api/menu-items/:id/availability` | Ativar/desativar item | ✅ admin |
| DELETE | `/api/menu-items/:id` | Remover item | ✅ admin |

### Mesas
| Método | Rota | Descrição | Auth |
|---|---|---|---|
| GET | `/api/tables` | Listar mesas | ✅ |
| POST | `/api/tables` | Criar mesa | ✅ admin |
| PUT | `/api/tables/:id` | Atualizar mesa | ✅ admin |
| PATCH | `/api/tables/:id/status` | Atualizar status | ✅ |
| DELETE | `/api/tables/:id` | Remover mesa | ✅ admin |

### Comandas
| Método | Rota | Descrição | Auth |
|---|---|---|---|
| GET | `/api/orders` | Listar comandas | ✅ |
| POST | `/api/orders` | Abrir comanda | ✅ waiter |
| PUT | `/api/orders/:id` | Atualizar comanda | ✅ waiter, kitchen |
| PATCH | `/api/orders/:id/status` | Atualizar status | ✅ waiter, kitchen |
| DELETE | `/api/orders/:id` | Remover comanda | ✅ admin, waiter |

### Itens da comanda
| Método | Rota | Descrição | Auth |
|---|---|---|---|
| GET | `/api/order-items` | Listar itens | ✅ |
| PATCH | `/api/order-items/:id/status` | Atualizar status | ✅ kitchen |
| DELETE | `/api/order-items/:id` | Remover item | ✅ |

---

## 🔑 Autenticação

A API usa JWT. Após o login, inclua o token no header de todas as requisições protegidas:

```
Authorization: Bearer SEU_TOKEN
```

---

## ⚡ Tempo real com Socket.io

A API emite eventos via Socket.io para o frontend:

| Evento | Quando é emitido |
|---|---|
| `item_status_updated` | Quando a cozinha atualiza o status de um item |

---

## 👨‍💻 Autor

Desenvolvido por **Renato Lins**

[![GitHub](https://img.shields.io/badge/GitHub-Renatolbn-181717?style=flat&logo=github)](https://github.com/Renatolbn)

---

## 📄 Licença

Este projeto está sob a licença ISC.
