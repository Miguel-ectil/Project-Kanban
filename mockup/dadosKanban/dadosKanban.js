
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

const dadosKanban = [
  {
    id: "1",
    title: "Testar Navegadores",
    Description: "Verificar e garantir a compatibilidade da aplicação em diferentes navegadores.",
    finalDate: "25/11/2023",
    priority: "HIGH",
    status: "toDo"
  },
  {
    id: "2",
    title: "Atualizar Bibliotecas",
    Description: "Manter as libs atualizadas para garantir segurança e aproveitar novos recursos.",
    finalDate: "25/12/2023",
    priority: "LOW",
    status: "inProgress"
  },
  {
    id: "3",
    title: "Atualizar Bibliotecas",
    Description: "Manter as libs atualizadas para garantir segurança e aproveitar novos recursos.",
    finalDate: "25/12/2023",
    priority: "LOW",
    status: "doing"
  },
  {
    id: "4",
    title: "Final Project : App development",
    Description: "Business Web Development.",
    finalDate: "Finalizado",
    // priority: "HIGH",
    status: "done"
  },
  {
    id: "5",
    title: "Atualizar Bibliotecas",
    Description: "Manter as libs atualizadas para garantir segurança e aproveitar novos recursos.",
    finalDate: "25/12/2023",
    priority: "LOW",
    status: "toDo"
  },
  {
    id: "6",
    title: "Implementar Animações",
    Description: "Adicionar efeitos visuais e transiçõespara melhorar a experiência do usuário..",
    finalDate: "25/12/2023",
    priority: "MEDIUM",
    status: "toDo"
  },
];

// endpoint retorna dados das tarefas do Kanban
router.get('/dados-kanban', (req, res) => {  
//   const dadosKanban =  req.params.CupomFiscal

  res.status(200).json(dadosKanban);
})

// endpoint que cria novas tarefas do Kanban
router.post('/create-task', (req, res) => {  
    // Verifica se todos os dados necessários foram fornecidos no corpo da requisição
    const { title, description, finalDate, priority } = req.body;
    if (!title || !description || !finalDate || !priority) {
      return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
    }
  
    // Simula a criação da tarefa
    const newTask = {
      id: Math.floor(Math.random() * 1000), // Simula a geração de um ID único
      title: title,
      description: description,
      finalDate: finalDate,
      priority: priority
    };
  
    // Retorna a nova tarefa criada
    res.status(200).json(newTask);
  })

module.exports = router;