const manipulaData = require('./manipulaDados');
/**
 * Registra os dados de um número de telefone e nome de usuário em um arquivo JSON.
 * @param {string} number - O número de telefone.
 * @param {string} pushname - O nome de usuário.
 */
function registraNumero(number, pushname) {
    // Define o nome do arquivo com base no número de telefone
    const fileName = `./data/cliente_${number}.json`;

    // Cria um objeto com os dados do cliente
    let clientData = {
        numero: number,
        usuario: pushname,
        estagioConversa: 1,
        addres: '',
        addObs: '',
        carrinho: []
    };

    // Chama a função "manipulaData" para registrar os dados em um arquivo JSON
    manipulaData("registrarData", fileName, clientData)
}

module.exports = registraNumero;
