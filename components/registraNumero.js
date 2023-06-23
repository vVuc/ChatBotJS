const manipulaData = require('./manipulaDados');
function registraNumero(number, pushname) {
    const fileName = `./data/cliente_${number}.json`;
    let clientData = {
        numero: number,
        usuario: pushname,
        estagioConversa: 1,
        addres: '',
        addObs: '',
        carrinho: []
    };
    manipulaData("registrarData", fileName, clientData)
}

module.exports = registraNumero;
