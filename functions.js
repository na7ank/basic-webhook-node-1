const axios = require('axios');


// Envs
require('dotenv').config();


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


module.exports = { TrataDados3C, EnviarZaplus };
