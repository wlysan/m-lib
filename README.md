# Movie Library

## Descrição

O Movie Library é uma aplicação web para gerenciamento de uma biblioteca de filmes. O projeto consiste em um frontend desenvolvido com Next.js e um backend desenvolvido com Node.js, Express e Sequelize, conectando-se a um banco de dados PostgreSQL. A aplicação permite que os usuários registrem-se, façam login, criem listas de filmes, adicionem filmes às listas, avaliem os filmes e visualizem detalhes dos filmes a partir da API OMDB.

## Índice
- [Movie Library](#movie-library)
  - [Descrição](#descrição)
  - [Índice](#índice)
  - [Tecnologias Utilizadas](#tecnologias-utilizadas)
  - [Instalação](#instalação)
  - [Rotas da API](#rotas-da-api)  
  - [Contribuição](#contribuição)
  - [Licença](#licença)

## Tecnologias Utilizadas
- **Frontend**: Next.js, React, Axios
- **Backend**: Node.js, Express, Sequelize, JWT, Swagger, Winston
- **Banco de Dados**: PostgreSQL
- **Outras Dependências**: Bcryptjs, Dotenv, Body-parser, Cors

## Instalação
### Requisitos
- Node.js
- Docker (opcional, para rodar o banco de dados e a aplicação usando Docker Compose)

### Clonar o Repositório

git clone https://github.com/wlysan/m-lib.git
cd movie-library

### Backend

- Navegue para o diretório do backend
cd movie-api
- Instale as dependências
npm install
npm run dev

### Frontend

- Navegue para o diretório do backend
cd movie-frontend
- Instale as dependências
npm install
npm run dev

# Rotas da API
A documentação completa da API pode ser acessada em http://localhost:3000/api-docs.

## Autenticação
- POST /auth/register - Registrar um novo usuário
- POST /auth/login - Login de usuário
## Usuários
- GET /users - Obter todos os usuários
- DELETE /users/{id} - Deletar um usuário
- PUT /users/{id} - Atualizar um usuário
## Filmes
- POST /movies - Adicionar um novo filme
- POST /movies/rate - Avaliar um filme
- DELETE /movies/{id} - Deletar um filme
- PUT /movies/{id} - Atualizar a avaliação de um filme
## Listas
- POST /lists - Criar uma nova lista de filmes
- POST /lists/add-movie - Adicionar um filme à lista
- PUT /lists/update-rating - Atualizar a avaliação de um filme na lista
- DELETE /lists/{listId}/{movieId} - Deletar um filme da lista
- GET /lists/{listId}/movies - Obter todos os filmes de uma lista
## OMDB
- GET /omdb/search - Buscar filmes no OMDB

# Contribuição
Contribuições são bem-vindas! Sinta-se à vontade para abrir uma issue ou enviar um pull request.

# Licença
Este projeto está licenciado sob a licença MIT.

