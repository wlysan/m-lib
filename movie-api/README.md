# Projeto Backend

Este projeto é um backend para gerenciamento de filmes.

## Configuração

### Pré-requisitos

- Node.js
- Docker (opcional)

### Instalação

1. Clone o repositório: `git clone https://github.com/wlysan/movie-api.git`
2. Instale as dependências: `npm install`
3. Configure as variáveis de ambiente em um arquivo `.env`

### Execução

#### Execução local

1. Execute o servidor: `npm start`

#### Execução com Docker

1. Construa a imagem Docker: `docker build -t movie-api .`
2. Execute o container Docker: `docker run -p 3000:3000 movie-api`

## Configuração do ambiente

As variáveis de ambiente necessárias para a execução do backend estão definidas no arquivo `.env`. Aqui estão as variáveis padrão:
