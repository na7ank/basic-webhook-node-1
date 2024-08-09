const { TrataDados, enviarParaWebhook } = require('./functions');
const express = require('express');
const app = express();


// Middleware para analisar o corpo da requisição como JSON
app.use(express.json());


// Novo endpoint POST para receber JSON e exibir na tela
app.post('/oriondatachatfullvendas', async (req, res) => {
  // Corpo da requisição
  const jsonData = req.body;

  // Trata o JSON
  const validation = TrataDados(jsonData);
  let message = '';

  if (validation) {
    message = 'Dados Válidos!';
    
    // Envia os dados para o webhook
    const webhookSuccess = await enviarParaWebhook(jsonData);
    if (webhookSuccess) {
      message += ' Dados enviados para o webhook com sucesso!';
    } else {
      message += ' Falha ao enviar dados para o webhook.';
    }
  } else {
    message = 'Dados Inválidos!';
  }

  res.json({
    message: message,
    data: jsonData["call-history-was-created"]["ivr_digit_pressed"]
  });
});


app.listen(3000, () => {
  console.log('Servidor ouvindo na porta 3000');
});
