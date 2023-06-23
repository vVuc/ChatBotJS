const msgStrings = require("../mocks/Strings");
const configuraData = require("./configuraData");
const sendMsg = require("./sendMsg");

const addPedidoReplyMsg =async (client,body, Data, number_details) => {
    const indice = body - 1
    const newConfig = configuraData("addProdutosCarrinho", Data, msgStrings.menu.Option[indice]);
    console.log(newConfig);
    const ultimoElementoArr = newConfig.carrinho[newConfig.carrinho.length - 1];
    await client.sendMessage(number_details._serialized, msgStrings.pedidoAdicionado(ultimoElementoArr))
}

module.exports = addPedidoReplyMsg;