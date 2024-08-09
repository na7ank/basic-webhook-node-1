// index.js
const express = require('express')
const app = express()

app.get('/', function (req, res) {
  res.send('Hello World !')
})

// index.js
app.get('/oi', (req, res) => {
    res.send('Olá Mundo !')
})

// Novo endpoint POST para receber JSON e exibir na tela
app.post('/json', (req, res) => {
    // Obtém o corpo da requisição
    const jsonData = req.body;
    const key = req.header.key;

    
    // Exibe o JSON recebido na tela
    console.log(jsonData)
    res.json({
      message: 'JSON recebido!',
      data: jsonData
    });
  });
  

app.listen(3000)