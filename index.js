const { TrataDados, enviarParaWebhook } = require('./functions');
const express = require('express');
const app = express();


// Middleware para analisar o corpo da requisição como JSON
app.use(express.json());


// Novo endpoint POST para receber JSON e exibir na tela
app.post('/oriondatachatfullvendas', async (req, res) => {

  // Body da requisição
  const Dados_Ura_Json = req.body;

  // Trata o JSON
  const Dados_Ura_Validos = TrataDados(Dados_Ura_Json);

  // Se os dados forem validados
  if (Dados_Ura_Validos !== false) {
    const webhookSuccess = await enviarParaWebhook(Dados_Ura_Validos);
  } 

});


app.listen(3000, () => {
  console.log('Servidor ouvindo na porta 3000');
});
