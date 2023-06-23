const handleFile = require('./handleFile');
/**
 * Registra os dados de um número de telefone e nome de usuário em um arquivo JSON.
 * @param {string} number - O número de telefone.
 * @param {string} pushname - O nome de usuário.
 */
function registerNumber(number, pushname) {
    const fileName = `./src/bot/data/cliente_${number}.json`;

    let clientData = {
        numero: number,
        usuario: pushname,
        estagioConversa: 1,
        addres: '',
        addObs: '',
        carrinho: []
    };

    handleFile("registrarData", fileName, clientData)
}

module.exports = registerNumber;
