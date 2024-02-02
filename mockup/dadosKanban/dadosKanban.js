
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

const dadosKanban = [
  {
    id: "1",
    title: "Testar Navegadores",
    text: "Verificar e garantir a compatibilidade da aplicação em diferentes navegadores.",
    footer: "25/11/2023",
    priority: "HIGH",
  },
  {
    id: "2",
    title: "Atualizar Bibliotecas",
    text: "Manter as libs atualizadas para garantir segurança e aproveitar novos recursos.",
    footer: "25/12/2023",
    priority: "LOW",
  },
  {
    id: "3",
    title: "Atualizar Bibliotecas",
    text: "Manter as libs atualizadas para garantir segurança e aproveitar novos recursos.",
    footer: "25/12/2023",
    priority: "LOW",
  },
  {
    id: "4",
    title: "Final Project : App development",
    text: "Business Web Development.",
    footer: "Finalizado",
    // priority: "HIGH",
  },
  {
    id: "5",
    title: "Atualizar Bibliotecas",
    text: "Manter as libs atualizadas para garantir segurança e aproveitar novos recursos.",
    footer: "25/12/2023",
    priority: "LOW",
  },
  {
    id: "6",
    title: "Implementar Animações",
    text: "Adicionar efeitos visuais e transiçõespara melhorar a experiência do usuário..",
    footer: "25/12/2023",
    priority: "MEDIUM",
  },
];

// endpoint de Cupom Fiscal
router.get('/dados-kanban', (req, res) => {  
//   const dadosKanban =  req.params.CupomFiscal

  res.status(200).json(dadosKanban);
})

module.exports = router;