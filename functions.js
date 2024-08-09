const axios = require('axios');


// Função para validar os dados
function TrataDados(data) {
    let result = Boolean(data.name) ? 1 : 0;
    return result
}


// Função para enviar os dados ao webhook
async function enviarParaWebhook(data) {
    try {
        const zapluswebhook = 'https://conectawebhook.com.br/api/v1/webhooks-automation/catch/127427/E8ccMbWwwUrP/'
        const response = await axios.post(zapluswebhook, data);
        return response.status === 200;
    } catch (error) {
        console.error('Erro ao enviar dados para o webhook:', error);
        return false;
    }
}

module.exports = { TrataDados, enviarParaWebhook };
