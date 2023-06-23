/**
 * Obtém as mensagens e o preço total do carrinho de compras.
 * @param {Object} obj - Objeto contendo os dados do carrinho de compras.
 * @returns {Array} - Array contendo o preço total e as mensagens concatenadas do carrinho.
 */
function obterMensagensCarrinho(obj) {
    let mensagens = [];
    let prices = [];

    // Verifica se o objeto possui a propriedade "carrinho" e se é um array
    if (obj.carrinho && Array.isArray(obj.carrinho)) {
        // Percorre o array "carrinho" e extrai as mensagens e os preços
        obj.carrinho.forEach(function (item) {
            if (item.Msg) {
                mensagens.push(item.Msg);
            }

            if (item.Price) {
                prices.push(item.Price);
            }
        });

        // Calcula o preço total somando os preços do carrinho
        const totalPrice = prices.reduce((a, b) => a + b, 0);

        // Concatena as mensagens do carrinho separadas por vírgula
        const mensagensConcatenadas = mensagens.join(", ");

        // Retorna o preço total e as mensagens concatenadas em um array
        return [totalPrice, mensagensConcatenadas];
    }

    // Retorna um array vazio caso o objeto não esteja no formato esperado
    return [];
}

module.exports = obterMensagensCarrinho;
