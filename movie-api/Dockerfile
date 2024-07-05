# Usa a imagem oficial do Node.js como base
FROM node:16

# Cria e define o diretório de trabalho
WORKDIR /usr/src/app

# Copia os arquivos de dependências para o contêiner
COPY package*.json ./

# Instala as dependências do projeto
RUN npm install

# Copia o restante do código para o contêiner
COPY . .

# Exposição da porta que o aplicativo irá rodar
EXPOSE 3001

# Comando para iniciar o aplicativo
CMD ["npm", "start"]
