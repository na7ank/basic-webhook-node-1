const express = require('express');
const app = express();

// Middleware para analisar o corpo da requisição como JSON
app.use(express.json());

app.get('/', function (req, res) {
  res.send('Hello World !');
});

app.get('/oi', (req, res) => {
  res.send('Olá Mundo !');
});

// Novo endpoint POST para receber JSON e exibir na tela
app.post('/json', (req, res) => {
  // Obtém o corpo da requisição
  const jsonData = req.body;
  
  // Exibe o JSON recebido na tela
  console.log(jsonData);
  res.json({
    message: 'JSON recebido!',
    data: jsonData
  });
});

app.listen(3000, () => {
  console.log('Servidor ouvindo na porta 3000');
});
