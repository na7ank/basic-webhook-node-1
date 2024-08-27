# Serviço Básico de Integração
Objetivo é teste de integração simples entre dois sistemas. Este web serviço receberá dados do sistema 3c e caso os dados sejam validados segundo parâmetros definidos, iremos encaminha-los ao sistema zaplus.

## 1 - Iniciando
- `$ npm init -y`
- `$ touch index.js`
- `$ node index.js`
- `$ npm install`

## 2 - Recebendo e tratando os dados 3C

Exemplo de estrutura recebida do sisema 3C durante campanha URA:
```json
{
  "call-history-was-created": {
    "_id": "66b66d926059e900830823c3",
    "number": "5511942709200",
    "ivr_digit_pressed": "2",
    "should_dispatch_webhook": true,
    "max_time_exceeded": 0,
    "updated_at": "2024-08-09T19:27:14.194000Z",
    "created_at": "2024-08-09T19:27:14.194000Z"
  }
}
```

Caso os dados recebidos da 3C sejam aceitáveis. Procedemos para o envio ao sistema da ZAPLUS. A função resposável por validar os dados é `TrataDados3C(dados3c)`:

```javascript
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
```

```javascript
function TrataDados3C(data) {
    // Função para validar os dados recebidos do sistema 3C
    const { "call-history-was-created": { ivr_digit_pressed, number } } = data;
    if (ivr_digit_pressed == 1 && Boolean(number)) {
        // Retornaremos os dados apenas se o ivr_digit_pressed for igual a 1 e o number existir
        return {
            number: number,
            data: ivr_digit_pressed
        };
    }

    return false;
}
```

## 3 - Enviando dados de interesse ao sistema ZAPLUS
Após validar os dados queremos envia-los, usando a função `EnviarZaplus(data)`, ao sistema da ZAPLUS. Os dados de interesse cumprem certos valores de campos da estrutura anterior. A função `TrataDados3C(dados3c)` contém as regras de validação.


```javascript
async function EnviarZaplus(data) {
    // Função para enviar os dados ao sistema ZAPLUS
    try {
        const Zaplus_Webhook = process.env.API_URL_ZAPLUS;
        const response = await axios.post(Zaplus_Webhook, data);
        return response.status === 200;
    } catch (error) {
        console.error('Erro ao enviar dados para o webhook:', error);
        return false;
    }
}
```