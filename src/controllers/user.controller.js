const userService = require('../services/user.service')
const create = async (req) => {
    console.log(req);
    //Vou chamar isso no ultimo estagio da conversa com o bot, estagio 7.

    //Depois de cirar um User no meu proprio sistema com o fs, vou passar os dados para o banco de dados e apagar o arquivo.

    //Caso ele entre em contato novamente, vou verificar se ele ja tem um cadastro no meu sistema, se tiver, vou pegar os dados do banco de dados e passar para o bot.
    
    // const { number, userName, addres, paymentMethod, bought, Price } = req;

    // if (!number || !userName || !addres || !paymentMethod || !bought || !Price) {
    //     console.log('Submit all filds for registration');
    // }

    const user = await userService.create(req)

    if (!user) {
        console.log('error creating User');
    } else console.log('User create successfully');
}

module.exports = { create }