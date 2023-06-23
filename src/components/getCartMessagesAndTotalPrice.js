/**
 * Obtém as mensagens e o preço total do carrinho de compras.
 * @param {Object} obj - Objeto contendo os dados do carrinho de compras.
 * @returns {Array} - Array contendo o preço total e as mensagens concatenadas do carrinho.
 */
function getCartMessagesAndTotalPrice(obj) {
    let mensagens = [];
    let prices = [];

    if (obj.carrinho && Array.isArray(obj.carrinho)) {
        obj.carrinho.forEach(function (item) {
            if (item.Msg) {
                mensagens.push(item.Msg);
            }

            if (item.Price) {
                prices.push(item.Price);
            }
        });

        const totalPrice = prices.reduce((a, b) => a + b, 0);
        const mensagensConcatenadas = mensagens.join(", ");

        return [totalPrice, mensagensConcatenadas];
    }

    return [];
}

module.exports = getCartMessagesAndTotalPrice;
