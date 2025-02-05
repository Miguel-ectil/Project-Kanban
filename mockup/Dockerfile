# Usa uma imagem oficial do Node.js
FROM node:18

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia os arquivos de dependências e instala
COPY package.json package-lock.json ./
RUN npm install

# Copia o restante do código para dentro do container
COPY . .

# Define a variável de ambiente para a porta do servidor
ENV PORT=8080

# Expõe a porta que a API vai rodar
EXPOSE 8080

# Comando para iniciar o servidor
CMD ["npm", "start"]
