const fs = require('fs');
const registraNumero = require('../components/registraNumero');
const sendMsg = require('../components/sendMsg');
const configuraData = require('../components/configuraData');
const msgStrings = require('../mocks/Strings');
const addPedidoReplyMsg = require('../components/addPedidoEreplyMsg');
const manipulaData = require('../components/manipulaDados');
const { MessageMedia } = require('whatsapp-web.js');

const stepByStep = async (contact, msg, client) => {
    const { from, type, hasMedia, body, hasQuotedMsg } = msg; // destructuring
    const { pushname, number, name } = contact;
    const fileName = `./data/cliente_${number}.json`;
    const number_details = await client.getNumberId(number); // Obtém detalhes do número de telefone
    if (number_details) {
        if (!fs.existsSync(fileName)) {
            registraNumero(number, pushname)
            await client.sendMessage(number_details._serialized, msgStrings.apresentacao);

        } else {
            const Data = JSON.parse(manipulaData("PegarData", fileName, null));
            switch (Data.estagioConversa) {
                case 0:
                    if (body) {
                        await client.sendMessage(number_details._serialized, msgStrings.apresentacao)
                            .then(configuraData("estagio", Data, 1));
                    }
                    break;

                case 1:
                    //mostra o cardapio
                    if (body.match(/^1/)) {
                        const image = MessageMedia.fromFilePath('assets/1.png')
                        const sendOptions = {
                            caption: msgStrings.menu.categorias,
                        }
                        await client.sendMessage(number_details._serialized, image, sendOptions)
                            .then(configuraData("estagio", Data, 2));
                    }
                    // mostra a localização
                    if (body.match(/^2/)) {
                        await client.sendMessage(number_details._serialized, msgStrings.location)
                            .then(configuraData("estagio", Data, 1));
                    }
                    if (body.match(/^3/)) {
                        await client.sendMessage(number_details._serialized, msgStrings.aboutUs)
                            .then(configuraData("estagio", Data, 1));
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
                        await client.sendMessage(number_details._serialized, msgStrings.menu.categorias)
                            .then(configuraData("estagio", Data, 2));
                    }
                    if (body.match(/^2/)) {
                        await client.sendMessage(number_details._serialized, msgStrings.finalizar.nome)
                            .then(configuraData("estagio", Data, 4));
                    }
                    if (body.match(/^3/)) {
                        await client.sendMessage(number_details._serialized, msgStrings.pedidoCancelado)
                            .then(configuraData("estagio", Data, 0));
                        configuraData("removeProdutosCarrinho", Data, null)
                    }
                    break;
                case 4:
                    if (body) {
                        await client.sendMessage(number_details._serialized, msgStrings.finalizar.addres)
                            .then(configuraData("estagio", Data, 5));
                        configuraData("addNome", Data, body)
                    }
                    break;
                case 5:
                    if (body) {
                        configuraData("addLocal", Data, body);
                        await client.sendMessage(number_details._serialized, msgStrings.finalizar.validacaoInfo(Data.usuario, Data.addres))
                            .then(configuraData("estagio", Data, 6));

                    }
                    break;
                case 6:
                    if (body.match(/^1/)) {
                        const image = MessageMedia.fromFilePath('assets/2.png')
                        const sendOptions = {
                            caption: msgStrings.finalizar.resumo(Data, Data.addres, Data.usuario),
                        }
                        await client.sendMessage(number_details._serialized, image, sendOptions)
                            .then(configuraData("estagio", Data, 7));



                    }
                    if (body.match(/^2/)) {
                        await client.sendMessage(number_details._serialized, msgStrings.finalizar.nome)
                            .then(configuraData("estagio", Data, 4));

                    }
                    break;
                case 7:
                    if (body) {
                        configuraData("addObs", Data, body);
                        await client.sendMessage("120363160436652177@g.us", msgStrings.finalizar.newPedido(Data, Data.addres, Data.addObs, Data.numero, Data.usuario)).then(configuraData("estagio", Data, 0));
                        await client.sendMessage(number_details._serialized, msgStrings.finalizar.newPedido(Data, Data.addres, Data.addObs, Data.numero, Data.usuario))
                    }

                default:
                    const test = Data.estagioConversa[1]

                    if (body.match(/^1/)) {
                        await client.sendMessage(number_details._serialized, msgStrings.pedidoAdicionado(eval(`msgStrings.menu.${test}[${body - 1}].Msg`)))
                            .then(configuraData("estagio", Data, 3));
                        configuraData("addProdutosCarrinho", Data, eval(`msgStrings.menu.${test}[${body - 1}]`));
                    }
                    if (body.match(/^2/)) {
                        await client.sendMessage(number_details._serialized, msgStrings.pedidoAdicionado(eval(`msgStrings.menu.${test}[${body - 1}].Msg`)))
                            .then(configuraData("estagio", Data, 3));
                        configuraData("addProdutosCarrinho", Data, eval(`msgStrings.menu.${test}[${body - 1}]`));
                    }
                    if (body.match(/^3/)) {
                        await client.sendMessage(number_details._serialized, msgStrings.pedidoAdicionado(eval(`msgStrings.menu.${test}[${body - 1}].Msg`)))
                            .then(configuraData("estagio", Data, 3));
                        configuraData("addProdutosCarrinho", Data, eval(`msgStrings.menu.${test}[${body - 1}]`));
                    }
                    if (body.match(/^4/)) {
                        await client.sendMessage(number_details._serialized, msgStrings.pedidoAdicionado(eval(`msgStrings.menu.${test}[${body - 1}].Msg`)))
                            .then(configuraData("estagio", Data, 3));
                        configuraData("addProdutosCarrinho", Data, eval(`msgStrings.menu.${test}[${body - 1}]`));
                    }
                    if (body.match(/^5/)) {
                        await client.sendMessage(number_details._serialized, msgStrings.pedidoAdicionado(eval(`msgStrings.menu.${test}[${body - 1}].Msg`)))
                            .then(configuraData("estagio", Data, 3));
                        configuraData("addProdutosCarrinho", Data, eval(`msgStrings.menu.${test}[${body - 1}]`));
                    }
                    break;
            }
        }
    } else console.log("Numero não cadastrado no whatsapp");
}
module.exports = stepByStep;