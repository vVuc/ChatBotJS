const qrcode = require('qrcode-terminal');
const stepByStep = require('./stages/StepByStep.js');
const { Client, LocalAuth, MessageMedia, Location } = require('whatsapp-web.js');
const client = new Client({ authStrategy: new LocalAuth({ clientId: "Duck", dataPath: "duckccession" }) });
client.initialize();

client.on('qr', qr => qrcode.generate(qr, { small: true }));

client.on('ready', () => console.log('🦆 O Duck acordou! 🦆\npois nao?🍷🗿'));


client.on('message_create', async (msg) => {
    if (msg?.broadcast || msg?.from == "status@broadcast") return;

    const contact = await msg.getContact();

    try {
        const { pushname, number, name } = contact
        const { from, type, hasMedia, body, hasQuotedMsg } = msg; // destructuring

        console.log(`😜 ${name} 😜: | ${body} | Mensagem recebida de: 👉 ${pushname} 👈 | 📱 ${number} 📱 | ⬆ para: ${msg.to} ⬆ | ${msg.deviceType}`);
        // const number_details = await client.getNumberId(number); // Obtém detalhes do número de telefone

        if (body) {
            stepByStep(contact, msg, client);
        }
        // if (body.match(/^location/)) {
        //     console.log("location");
        //     const location = new Location(37.7749, -122.4194, null);
        //     console.log(location);
        //     await client.sendMessage(number_details._serialized, location);
        // }

        // Carregar a imagem em uma instância de MessageMedia
        // const imageMedia = MessageMedia.fromFilePath('assets/1.png');
        // pções de envio da mensagem
        // const sendOptions = {
        //     caption: 'Descrição da imagem'
        // };


    } catch (error) {
    }
});
process.on("unhandledRejection", (reason) => {
    console.log(reason)
});