FROM node:18

# Defina o diretório de trabalho dentro do contêiner
WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

# Copie o restante dos arquivos do projeto
COPY . .

# Execute a build da aplicação
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
