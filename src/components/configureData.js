const handleFile = require("./handleFile");

/**
 * Configura os dados do usuário e realiza ações de atualização no arquivo.
 * @param {string} action - Ação a ser executada.
 * @param {object} Data - Dados do usuário.
 * @param {*} newValue - Novo valor a ser configurado.
 * @returns {object} - Dados atualizados do usuário.
 */
const configureData = (action, Data, newValue) => {
    const fileName = `./src/bot/data/cliente_${Data.number}.json`;

    switch (action) {
        case "estagio":
            Data.conversationStage = newValue;
            break;

        case "paymentMethod":
            Data.paymentMethod = newValue;
            console.log("Estágio alterado com sucesso");
            break;

        case "addLocal":
            Data.addres = newValue;
            console.log("Endereço adicionado com sucesso");
            break;

        case "addNome":
            Data.userName = newValue;
            console.log("Nome adicionado com sucesso");
            break;

        case "addProdutosbought":
            Data.bought.push(newValue);
            console.log("Produto adicionado ao bought com sucesso");
            break;

        case "removeProdutosbought":
            Data.bought = [];
            console.log("Produtos removidos do bought com sucesso");
            break;

        default:
            console.log("Ação inválida");
            break;
    }

    handleFile ("atualizarData", fileName, Data);
    return Data;
};

module.exports = configureData ;
