const obterMensagensCarrinho = require("../components/objetoCarrinho");
const msgStrings = {
    pedidoCancelado: `Pedido cancelado com sucesso!`,
    erro: `❌ Digite uma opção válida, por favor. 
    ⚠ APENAS UMA OPÇÃO POR VEZ ⚠.`,
    apresentacao: `*Digite* o numero correspondete a opcão!
    👋 Olá, como vai?
    Eu sou Carlos, o assistente virtual da Delícias da Neide.
    Posso te ajudar? 🙋‍♂
    -----------------------------------
    1 - FAZER PEDIDO
    2 - NOSSA LOCALIZAÇÃO
    3 - SOBRE NÓS`,
    aboutUs: `👩‍🍳 *SOBRE NÓS* 👨‍🍳
    Bem-vindo à Delícias da Neide! Somos uma lanchonete dedicada a oferecer sabores irresistíveis e uma experiência memorável. Com opções de hambúrgueres suculentos, pizzas deliciosas, bebidas refrescantes e sobremesas tentadoras, garantimos qualidade excepcional em cada prato. Nossa equipe atenciosa está pronta para recebê-lo com um sorriso caloroso. Valorizamos sua satisfação e seguimos rigorosos padrões de segurança alimentar. Escolha a Delícias da Neide e desfrute de comida deliciosa e atendimento de excelência. Seja /bem-vindo!
    -----------------------------------
    1 - FAZER PEDIDO
    2 - NOSSA LOCALIZAÇÃO`,
    location: "Mandar uma localizxação typeLocations",
    menu: {
        categorias: `*Digite* o numero correspondete a opcão!
        🚨  CARDÁPIO  🚨

    1 - Hamburguer 
    2 - Pizzas  
    3 - Bebidas 
    4 - Sobremesas 
    5 - Petiscos`,

        Hamburguer: {
            MenuHamburgue: `*Digite* o numero correspondete a opcão!
        🚨  CARDÁPIO  🚨

    1 - Hamburguer simples 
    2 - Hamburguer x-bacon
    3 - Hamburguer x-egg
    4 - Hamburguer x-salada 
    5 - Hamburguer x-tudo`,
            options: [
                { Msg: 'Hamburguer simples', Price: 7 },
                { Msg: 'Hamburguer x-bacon', Price: 8 },
                { Msg: 'Hamburguer x-egg', Price: 8 },
                { Msg: 'Hamburguer x-salada', Price: 8 },
                { Msg: 'Hamburguer x-tudo', Price: 9 }
            ]
        },
        Pizzas: {
            MenuPizzas: `*Digite* o numero correspondete a opcão!
        🚨  CARDÁPIO  🚨

    1 - Portuguesa 
    2 - Calabresa
    3 - Frango com catupiry 
    4 - Quatro queijos 
    5 - Chocolate`,
            options: [
                { Msg: 'Portuguesa', Price: 25 },
                { Msg: 'Calabresa', Price: 22 },
                { Msg: 'Frango com catupiry', Price: 24 },
                { Msg: 'Quatro queijos', Price: 23 },
                { Msg: 'Chocolate', Price: 20 }
            ]
        },
        Bebidas: {
            MenuBebidas: `*Digite* o numero correspondete a opcão!
        🚨  CARDÁPIO  🚨

    1 - Coca-cola 
    2 - Fanta laranja
    3 - Fanta uva 
    4 - Guarana 
    5 - Pepsi`,
            options: [
                { Msg: 'Coca-cola', Price: 5 },
                { Msg: 'Fanta laranja', Price: 4 },
                { Msg: 'Fanta uva', Price: 4 },
                { Msg: 'Guarana', Price: 4 },
                { Msg: 'Pepsi', Price: 5 }
            ]
        },
        Sobremesas: {
            MenuSobremesas: `*Digite* o numero correspondete a opcão!
        🚨  CARDÁPIO  🚨

    1 - Açai 
    2 - Pudim
    3 - Bolo pote
    4 - Pavé
    5 - Chocolate`,
            options: [
                { Msg: 'Açai', Price: 10 },
                { Msg: 'Pudim', Price: 8 },
                { Msg: 'Bolo pote', Price: 12 },
                { Msg: 'Pavé', Price: 9 },
                { Msg: 'Chocolate', Price: 7 }
            ]
        },
        Petiscos: {
            MenuPetiscos: `*Digite* o numero correspondete a opcão!
        🚨  CARDÁPIO  🚨

    1 - Batata frita 
    2 - Batata frita cheda e bacon
    3 - nuggets 
    4 - calabresa acebolada 
    5 - Iscas de carna`,
            options: [
                { Msg: 'Batata frita', Price: 8 },
                { Msg: 'Batata frita cheda e bacon', Price: 10 },
                { Msg: 'nuggets', Price: 9 },
                { Msg: 'calabresa acebolada', Price: 11 },
                { Msg: 'Iscas de carna', Price: 12 }
            ]
        },
    },
    pedidoAdicionado: item => `*Digite* o numero correspondete a opcão! 
    ✅ ${item} Pedidos no seu carrinho
    
    
    -----------------------------------
    1 - CONTINUAR pedindo
    2 - FINALIZAR pedido 
    3 - CANCELAR pedido`,
    finalizar: {
        nome: `Informe seus dados:
        informe seu nome para entrega`,
        addres: `🗺 Agora, informe o ENDEREÇO.
    ( Rua, Número, Bairro ) 
    
    
    -----------------------------------
    0 - CANCELAR pedido`,
        validacaoInfo: (endereco, nome) => `*${nome},* *${endereco}* está tudo certo?
        1 - Sim
        2 - Não`,
        resumo: (data, endereco, nome) => {
            let pedidos = obterMensagensCarrinho(data)
            return `🗒 RESUMO DO PEDIDO:
    🪪 nome : ${nome}.
    🛒 carrinho: ${pedidos[1]}.
    🚚 Taxa de entrega: R$5. 
    🗺 Endereço: ${endereco}.
    💰 Valor : R$${pedidos[0]}. 
    ⏳ Tempo de entrega: 30 minutos. 
    
    🔊 O pagamento sera realizado em cartão ou dinheiro?`},// Button de whatsapp
        newPedido: (carrinho, endereco, tipoDePagamanento, numero, nome) => {
            let pedidos = obterMensagensCarrinho(carrinho)
            return `🔔 NOVO PEDIDO 🔔:

    📞 Cliente: ${numero}
    💳 nome: ${nome}
    🛒 carrinho: ${pedidos[1]}
    📍 Endereço: ${endereco}
    🚚 Taxa de entrega: a confirmar.
    💰 Valor dos bolos: ${pedidos[0]}.
    ⏳ Tempo de entrega: 50 minutos.
    🛑 Detalhes:${tipoDePagamanento}.
    `}
    }
}

module.exports = msgStrings;