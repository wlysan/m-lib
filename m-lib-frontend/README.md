# Projeto Frontend

Este projeto é uma interface de usuário para gerenciamento de filmes.

## Configuração

### Pré-requisitos

- Node.js
- npm
- Next.js 
- Docker (Opcional)

### Instalação

1. Clone o repositório: `git clone https://github.com/wlysan/movie-frontend.git`
2. Instale as dependências: `npm install`
3. Configure as variáveis de ambiente em um arquivo `.env`

### Execução

#### Execução local

1. Execute o servidor de desenvolvimento: `npm start` ou `yarn start`

#### Execução com Docker

1. Construa a imagem Docker: `docker build -t movie-frontend .`
2. Execute o container Docker: `docker run -p 3000:3000 movie-frontend`
