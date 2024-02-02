const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 4000;

// Middleware para configurar o CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    return res.status(200).json({});
  }
  next();
});

app.use(bodyParser.json());

// Importar as APIs dos arquivos separados
const api1Router = require('../mockup/dadosKanban/dadosKanban');



// Usar as APIs com a URL base desejada
app.use('', api1Router);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
