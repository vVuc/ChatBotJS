const manipulaData = require('./components/manipulaDados');

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
                mensagens.push(item.Price);
            }

        });

        return [Price.reduce((a, b) => a + b, 0), mensagens.join(", ")];
    }
}

const Data = JSON.parse(manipulaData("PegarData", "data/cliente_5521964810915.json", null))

const test = obterMensagensCarrinho(Data)

console.log(test);