const TrataDados = require('./functions')
const express = require('express');
const app = express();


// Middleware para analisar o corpo da requisição como JSON
app.use(express.json());


// Novo endpoint POST para receber JSON e exibir na tela
app.post('/json', (req, res) => {
  // Corpo da requisição
  const jsonData = req.body;

  // Trata o JSON
  const validation = TrataDados(jsonData)
  let message = ''
  if (validation) {
    message = 'Dados Válidos!'
  } else {
    message = 'Dados Inválidos!'
  }

  res.json({
    message: message,
    data: jsonData
  });
});


app.listen(3000, () => {
  console.log('Servidor ouvindo na porta 3000');
});
