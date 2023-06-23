function obterMensagensCarrinho(obj) {
    let mensagens = [];
    let Price = [];

    if (obj.carrinho && Array.isArray(obj.carrinho)) {
        obj.carrinho.forEach(function (item) {
            if (item.Msg) {
                mensagens.push(item.Msg);
            }

        });
        obj.carrinho.forEach(function (item) {
            if (item.Price) {
                Price.push(item.Price);
            }

        });

        return [Price.reduce((a, b) => a + b, 0), mensagens.join(", ")];
    }
}
module.exports = obterMensagensCarrinho;