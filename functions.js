const axios = require('axios');


// Função para validar os dados
function TrataDados3C(data) {
    const { "call-history-was-created": { ivr_digit_pressed, number } } = data;

    if (Boolean(ivr_digit_pressed) && Boolean(number)) {
        return {
            number: number,
            data: ivr_digit_pressed
        };
    }

    return false;
}



// Função para enviar os dados ao ZAPLUS
async function EnviarZaplus(data) {
    try {
        const Zaplus_Webhook = 'https://conectawebhook.com.br/api/v1/webhooks-automation/catch/127427/E8ccMbWwwUrP/'
        const response = await axios.post(Zaplus_Webhook, data);
        return response.status === 200;
    } catch (error) {
        console.error('Erro ao enviar dados para o webhook:', error);
        return false;
    }
}

module.exports = { TrataDados3C, EnviarZaplus };
