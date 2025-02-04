import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js'; 
import dadosKanbanRouter from './dadosKanban/dadosKanban.js'; 

dotenv.config();

const app = express();
const PORT = 4000;

// Middleware
app.use(cors()); 
app.use(bodyParser.json()); // Parse do corpo da requisição como JSON

// Conexão com o Supabase
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// Definir rotas
app.use('/api', dadosKanbanRouter);

// Rota para testar a conexão com o Supabase
app.get('/test', async (req, res) => {
  try {
    const { data, error } = await supabase.from('tasks').select('*');
    if (error) throw error;
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
