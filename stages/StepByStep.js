const fs = require('fs');
const registraNumero = require('../components/registraNumero');
const configuraData = require('../components/configuraData');
const msgStrings = require('../mocks/Strings');
const manipulaData = require('../components/manipulaDados');
const { MessageMedia } = require('whatsapp-web.js');
/**
 * Função responsável por gerenciar o fluxo de interações do chatBot.
 *
 * @param {object} contact - Informações de contato do remetente da mensagem.
 * @param {object} msg - Mensagem recebida pelo chatBot.
 * @param {object} client - Instância do cliente do WhatsApp.
 * @returns {Promise<void>}
 */
const stepByStep = async (contact, msg, client) => {
    const { from, type, hasMedia, body, hasQuotedMsg } = msg;
    const { pushname, number, name } = contact;
    const fileName = `./data/cliente_${number}.json`;
    const number_details = await client.getNumberId(number);

    if (number_details) {
        if (!fs.existsSync(fileName)) {
            registraNumero(number, pushname);
            await client.sendMessage(number_details._serialized, msgStrings.apresentacao);
        } else {
            const Data = JSON.parse(manipulaData("PegarData", fileName, null));
            const { estagioConversa } = Data;

            switch (estagioConversa) {
                case 0:
                    if (body) {
                        await client.sendMessage(number_details._serialized, msgStrings.apresentacao);
                        configuraData("estagio", Data, 1);
                    }
                    break;

                case 1:
                    if (body.match(/^1/)) {
                        const image = MessageMedia.fromFilePath('assets/1.png');
                        const sendOptions = {
                            caption: msgStrings.menu.categorias,
                        };
                        await client.sendMessage(number_details._serialized, image, sendOptions);
                        configuraData("estagio", Data, 2);
                    } else if (body.match(/^2/)) {
                        await client.sendMessage(number_details._serialized, msgStrings.location);
                        configuraData("estagio", Data, 1);
                    } else if (body.match(/^3/)) {
                        await client.sendMessage(number_details._serialized, msgStrings.aboutUs);
                        configuraData("estagio", Data, 1);
                    }
                    break;

                case 2:
                    if (body.match(/^1/)) {
                        await client.sendMessage(number_details._serialized, msgStrings.menu.Hamburguer.MenuHamburgue)
                            .then(configuraData("estagio", Data, ["menu", "Hamburguer.options"]));
                    }
                    if (body.match(/^2/)) {
                        await client.sendMessage(number_details._serialized, msgStrings.menu.Pizzas.MenuPizzas)
                            .then(configuraData("estagio", Data, ["menu", "Pizzas.options"]));
                    }
                    if (body.match(/^3/)) {
                        await client.sendMessage(number_details._serialized, msgStrings.menu.Bebidas.MenuBebidas)
                            .then(configuraData("estagio", Data, ["menu", "Bebidas.options"]));
                    }
                    if (body.match(/^4/)) {
                        await client.sendMessage(number_details._serialized, msgStrings.menu.Sobremesas.MenuSobremesas)
                            .then(configuraData("estagio", Data, ["menu", "Sobremesas.options"]));
                    }
                    if (body.match(/^5/)) {
                        await client.sendMessage(number_details._serialized, msgStrings.menu.Petiscos.MenuPetiscos)
                            .then(configuraData("estagio", Data, ["menu", "Petiscos.options"]));
                    }
                    break;

                case 3:
                    if (body.match(/^1/)) {
                        await client.sendMessage(number_details._serialized, msgStrings.menu.categorias);
                        configuraData("estagio", Data, 2);
                    } else if (body.match(/^2/)) {
                        await client.sendMessage(number_details._serialized, msgStrings.finalizar.nome);
                        configuraData("estagio", Data, 4);
                    } else if (body.match(/^3/)) {
                        await client.sendMessage(number_details._serialized, msgStrings.pedidoCancelado);
                        configuraData("estagio", Data, 0);
                        configuraData("removeProdutosCarrinho", Data, null);
                    }
                    break;

                case 4:
                    if (body) {
                        await client.sendMessage(number_details._serialized, msgStrings.finalizar.addres);
                        configuraData("estagio", Data, 5);
                        configuraData("addNome", Data, body);
                    }
                    break;

                case 5:
                    if (body) {
                        configuraData("addLocal", Data, body);
                        await client.sendMessage(number_details._serialized, msgStrings.finalizar.validacaoInfo(Data.usuario, Data.addres));
                        configuraData("estagio", Data, 6);
                    }
                    break;

                case 6:
                    if (body.match(/^1/)) {
                        const image = MessageMedia.fromFilePath('assets/2.png');
                        const sendOptions = {
                            caption: msgStrings.finalizar.resumo(Data, Data.addres, Data.usuario),
                        };
                        await client.sendMessage(number_details._serialized, image, sendOptions);
                        configuraData("estagio", Data, 7);
                    } else if (body.match(/^2/)) {
                        await client.sendMessage(number_details._serialized, msgStrings.finalizar.nome);
                        configuraData("estagio", Data, 4);
                    }
                    break;

                case 7:
                    if (body) {
                        configuraData("addObs", Data, body);
                        await client.sendMessage("120363160436652177@g.us", msgStrings.finalizar.newPedido(Data, Data.addres, Data.addObs, Data.numero, Data.usuario));
                        await client.sendMessage(number_details._serialized, msgStrings.finalizar.newPedido(Data, Data.addres, Data.addObs, Data.numero, Data.usuario));
                        configuraData("estagio", Data, 0);
                    }
                    break;

                default:
                    const test = Data.estagioConversa[1];
                    const selectedMenuOption = eval(`msgStrings.menu.${test}[${body - 1}]`);

                    if (selectedMenuOption) {
                        await client.sendMessage(number_details._serialized, msgStrings.pedidoAdicionado(selectedMenuOption.Msg));
                        configuraData("estagio", Data, 3);
                        configuraData("addProdutosCarrinho", Data, selectedMenuOption);
                    }
                    break;
            }
        }
    } else {
        console.log("Número não cadastrado no WhatsApp.");
    }
};

module.exports = stepByStep;
