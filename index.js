const qrcode = require('qrcode-terminal');
const stepByStep = require('./src/bot/stages/StepByStep');
const connectMongoDB = require('./src/db/db');
const { Client, LocalAuth } = require('whatsapp-web.js');

const client = new Client({
    authStrategy: new LocalAuth({ clientId: "menezes", dataPath: "menezesSession" })
});

connectMongoDB();
client.initialize();

client.on('qr', qr => qrcode.generate(qr, { small: true }));

client.on('ready', () => {
    console.log('🤖 ChatBot ON! 🤖');
});

client.on('message', async (msg) => {
    if (msg.broadcast || msg.from === "status@broadcast") {
        return;
    }

    const contact = await msg.getContact();

    try {
        const { pushname, number, name } = contact;
        const { body } = msg;
        const chat = await msg.getChat();


        if (!chat.isGroup) {
            console.log(`😀 ${name} 😀: | ${body} | message received from: 👉 ${pushname} 👈 | 📱 ${number} 📱 | ⬆ to: ${msg.to} ⬆ | ${msg.deviceType}`);
            stepByStep(contact, msg, client);
        }
    } catch (error) {
        console.log('This message is from a group', error);
    }
});

process.on("unhandledRejection", (reason) => {
    console.log(reason);
});
