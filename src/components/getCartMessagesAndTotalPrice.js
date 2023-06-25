/**
 * Obtém as mensagens e o preço total do bought de compras.
 * @param {Object} obj - Objeto contendo os dados do bought de compras.
 * @returns {Array} - Array contendo o preço total e as mensagens concatenadas do bought.
 */
function getCartMessagesAndTotalPrice(obj) {
    let message = [];
    let prices = [];

    if (obj.bought && Array.isArray(obj.bought)) {
        obj.bought.forEach((i) => {
            if (i.Msg) {
                message.push(i.Msg);
            }

            if (i.Price) {
                prices.push(i.Price);
            }
        });

        const totalPrice = prices.reduce((a, b) => a + b, 0);
        const messageConcat = message.join(", ");

        return [totalPrice, messageConcat];
    }

    return [];
}

module.exports = getCartMessagesAndTotalPrice;
