const axios = require('axios');


// Função para validar os dados
function TrataDados(data) {
    let result = Boolean(data.name) ? 1 : 0;
    return result
}


// Função para enviar os dados ao webhook
async function enviarParaWebhook(data) {
    try {
        const response = await axios.post('https://ubiquitous-space', data);
        return response.status === 200;
    } catch (error) {
        console.error('Erro ao enviar dados para o webhook:', error);
        return false;
    }
}

module.exports = { TrataDados, enviarParaWebhook };
