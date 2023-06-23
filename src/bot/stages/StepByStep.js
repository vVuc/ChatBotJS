const fs = require('fs');
const registerNumber = require('../../components/registerNumber');
const configureData = require('../../components/configureData');
const getMessageStrings = require('../../../mocks/getMessageStrings');
const handleFile = require('../../components/handleFile');
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
    const { body } = msg;
    const { pushname, number } = contact;
    const fileName = `./src/bot/data/cliente_${number}.json`;
    const number_details = await client.getNumberId(number);

    if (number_details) {
        if (!fs.existsSync(fileName)) {
            registerNumber(number, pushname);
            await client.sendMessage(number_details._serialized, getMessageStrings.apresentacao);
        } else {
            const Data = JSON.parse(handleFile("PegarData", fileName, null));
            const { estagioConversa } = Data;

            switch (estagioConversa) {
                case 0:
                    if (body) {
                        await client.sendMessage(number_details._serialized, getMessageStrings.apresentacao);
                        configureData("estagio", Data, 1);
                    }
                    break;

                case 1:
                    if (body.match(/^1/)) {
                        const image = MessageMedia.fromFilePath('./src/bot/assets/1.png');
                        const sendOptions = {
                            caption: getMessageStrings.menu.categorias,
                        };
                        await client.sendMessage(number_details._serialized, image, sendOptions);
                        configureData("estagio", Data, 2);
                    } else if (body.match(/^2/)) {
                        await client.sendMessage(number_details._serialized, getMessageStrings.location);
                        configureData("estagio", Data, 1);
                    } else if (body.match(/^3/)) {
                        await client.sendMessage(number_details._serialized, getMessageStrings.aboutUs);
                        configureData("estagio", Data, 1);
                    }
                    break;

                case 2:
                    if (body.match(/^1/)) {
                        await client.sendMessage(number_details._serialized, getMessageStrings.menu.Hamburguer.MenuHamburgue)
                            .then(configureData("estagio", Data, ["menu", "Hamburguer.options"]));
                    }
                    if (body.match(/^2/)) {
                        await client.sendMessage(number_details._serialized, getMessageStrings.menu.Pizzas.MenuPizzas)
                            .then(configureData("estagio", Data, ["menu", "Pizzas.options"]));
                    }
                    if (body.match(/^3/)) {
                        await client.sendMessage(number_details._serialized, getMessageStrings.menu.Bebidas.MenuBebidas)
                            .then(configureData("estagio", Data, ["menu", "Bebidas.options"]));
                    }
                    if (body.match(/^4/)) {
                        await client.sendMessage(number_details._serialized, getMessageStrings.menu.Sobremesas.MenuSobremesas)
                            .then(configureData("estagio", Data, ["menu", "Sobremesas.options"]));
                    }
                    if (body.match(/^5/)) {
                        await client.sendMessage(number_details._serialized, getMessageStrings.menu.Petiscos.MenuPetiscos)
                            .then(configureData("estagio", Data, ["menu", "Petiscos.options"]));
                    }
                    break;

                case 3:
                    if (body.match(/^1/)) {
                        await client.sendMessage(number_details._serialized, getMessageStrings.menu.categorias);
                        configureData("estagio", Data, 2);
                    } else if (body.match(/^2/)) {
                        await client.sendMessage(number_details._serialized, getMessageStrings.finalizar.nome);
                        configureData("estagio", Data, 4);
                    } else if (body.match(/^3/)) {
                        await client.sendMessage(number_details._serialized, getMessageStrings.pedidoCancelado);
                        configureData("estagio", Data, 0);
                        configureData("removeProdutosCarrinho", Data, null);
                    }
                    break;

                case 4:
                    if (body) {
                        await client.sendMessage(number_details._serialized, getMessageStrings.finalizar.addres);
                        configureData("estagio", Data, 5);
                        configureData("addNome", Data, body);
                    }
                    break;

                case 5:
                    if (body.match(/^0/)) {
                        await client.sendMessage(number_details._serialized, getMessageStrings.pedidoCancelado);
                        configureData("estagio", Data, 0);
                    } else {
                        configureData("addLocal", Data, body);
                        await client.sendMessage(number_details._serialized, getMessageStrings.finalizar.validacaoInfo(Data.usuario, Data.addres));
                        configureData("estagio", Data, 6);

                    }
                    break;

                case 6:
                    if (body.match(/^1/)) {
                        const image = MessageMedia.fromFilePath('./src/bot/assets/2.png');
                        const sendOptions = {
                            caption: getMessageStrings.finalizar.resumo(Data, Data.addres, Data.usuario),
                        };
                        await client.sendMessage(number_details._serialized, image, sendOptions);
                        configureData("estagio", Data, 7);
                    } else if (body.match(/^2/)) {
                        await client.sendMessage(number_details._serialized, getMessageStrings.finalizar.nome);
                        configureData("estagio", Data, 4);
                    }
                    break;

                case 7:
                    if (body) {
                        configureData("addObs", Data, body);
                        await client.sendMessage("120363160436652177@g.us", getMessageStrings.finalizar.newPedido(Data, Data.addres, Data.addObs, Data.numero, Data.usuario));
                        await client.sendMessage(number_details._serialized, getMessageStrings.finalizar.newPedido(Data, Data.addres, Data.addObs, Data.numero, Data.usuario));
                        configureData("estagio", Data, 0);
                    }
                    break;

                default:
                    const test = Data.estagioConversa[1];
                    const selectedMenuOption = eval(`getMessageStrings.menu.${test}[${body - 1}]`);

                    if (selectedMenuOption) {
                        await client.sendMessage(number_details._serialized, getMessageStrings.pedidoAdicionado(selectedMenuOption.Msg));
                        configureData("estagio", Data, 3);
                        configureData("addProdutosCarrinho", Data, selectedMenuOption);
                    }
                    break;
            }
        }
    } else {
        console.log("Número não cadastrado no WhatsApp.");
    }
};

module.exports = stepByStep;
