
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

// endpoint de Cupom Fiscal
router.get('/dados-kanban', (req, res) => {  
//   const dadosKanban =  req.params.CupomFiscal

  res.status(200).json(dadosKanban);
})

module.exports = router;