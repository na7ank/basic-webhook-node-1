const { TrataDados3C, EnviarZaplus } = require('./functions');
const express = require('express');
const app = express();


// Middleware para analisar o corpo da requisição como JSON
app.use(express.json());


// Recebe  um POST de 3C
app.post('/oriondatachatfullvendas', async (req, res) => {

  // Trata o JSON
  const Dados_Ura_Json = req.body;
  const Dados_Ura_Validos = TrataDados3C(Dados_Ura_Json);

  // Se os dados forem validados
  if (Dados_Ura_Validos !== false) {
    const webhookSuccess = await EnviarZaplus(Dados_Ura_Validos);
  } 

});


app.listen(3000, () => {
  console.log('Servidor ouvindo na porta 3000');
});
