const manipulaData = require("./manipulaDados");

/**
 * Configura os dados do usuário e realiza ações de atualização no arquivo.
 * @param {string} action - Ação a ser executada.
 * @param {object} Data - Dados do usuário.
 * @param {*} newValue - Novo valor a ser configurado.
 * @returns {object} - Dados atualizados do usuário.
 */
const configuraData = (action, Data, newValue) => {
    const fileName = `./data/cliente_${Data.numero}.json`;

    switch (action) {
        case "estagio":
            Data.estagioConversa = newValue;
            break;

        case "addObs":
            Data.addObs = newValue;
            console.log("Estágio alterado com sucesso");
            break;

        case "addLocal":
            Data.addres = newValue;
            console.log("Endereço adicionado com sucesso");
            break;

        case "addNome":
            Data.usuario = newValue;
            console.log("Nome adicionado com sucesso");
            break;

        case "addProdutosCarrinho":
            Data.carrinho.push(newValue);
            console.log("Produto adicionado ao carrinho com sucesso");
            break;

        case "removeProdutosCarrinho":
            Data.carrinho = [];
            console.log("Produtos removidos do carrinho com sucesso");
            break;

        default:
            console.log("Ação inválida");
            break;
    }

    manipulaData("atualizarData", fileName, Data);
    return Data;
};

module.exports = configuraData;
