const manipulaData = require("./manipulaDados");

const configuraData = (action, Data, newValue) => {
    const fileName = `./data/cliente_${Data.numero}.json`;

    switch (action) {
        case "estagio":
            Data.estagioConversa = newValue;

            manipulaData("atualizarData", fileName, Data);

            console.log("Estágio alterado com sucesso");
            return Data;

        case "addObs":
            Data.addObs = newValue;

            manipulaData("atualizarData", fileName, Data);

            console.log("Estágio alterado com sucesso");
            return Data;

        case "addLocal":
            Data.addres = newValue;

            manipulaData("atualizarData", fileName, Data);

            console.log("Endereço adicionado com sucesso");
            return Data;
        case "addNome":
            Data.usuario = newValue;

            manipulaData("atualizarData", fileName, Data);

            console.log("nome adicionado com sucesso");
            return Data;

        case "addProdutosCarrinho":
            Data.carrinho.push(newValue);

            manipulaData("atualizarData", fileName, Data);

            console.log("Produto adicionado ao carrinho com sucesso");

            return Data;

        case "removeProdutosCarrinho":
            Data.carrinho = [];

            manipulaData("atualizarData", fileName, Data);

            console.log("Produto adicionado ao carrinho com sucesso");

            return Data;

        default:
            console.log("Erro ao configurar os dados");
            break;
    }
};

module.exports = configuraData;