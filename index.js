// Importar as dependências necessárias
const qrcode = require('qrcode-terminal');
const stepByStep = require('./stages/StepByStep.js');
const { Client, LocalAuth, MessageMedia, Location } = require('whatsapp-web.js');

// Criar uma instância do cliente do WhatsApp
const client = new Client({
    authStrategy: new LocalAuth({ clientId: "Duck", dataPath: "duckccession" })
});

// Inicializar o cliente do WhatsApp
client.initialize();

// Exibir o QR Code de autenticação
client.on('qr', qr => qrcode.generate(qr, { small: true }));

// Evento disparado quando o cliente está pronto para uso
client.on('ready', () => {
    console.log('🦆 O Duck acordou! 🦆\npois nao?🍷🗿');
});

// Evento disparado ao receber uma nova mensagem
client.on('message', async (msg) => {
    // Verificar se a mensagem é um broadcast ou de um contato específico
    if (msg.broadcast || msg.from === "status@broadcast") {
        return; // Ignorar mensagens de broadcast
    }

    // Obter informações do contato
    const contact = await msg.getContact();

    try {
        // Extrair informações relevantes da mensagem e do contato
        const { pushname, number, name } = contact;
        const { from, type, hasMedia, body, hasQuotedMsg } = msg; // destructuring
        const chat = await msg.getChat();

        // Exibir informações da mensagem recebida no console
        console.log(`😜 ${name} 😜: | ${body} | Mensagem recebida de: 👉 ${pushname} 👈 | 📱 ${number} 📱 | ⬆ para: ${msg.to} ⬆ | ${msg.deviceType}`);
        // const number_details = await client.getNumberId(number); // Obter detalhes do número de telefone

        if (!chat.isGroup) {
            // Processar a mensagem usando a função stepByStep
            stepByStep(contact, msg, client);
        }
    } catch (error) {
        // Tratamento de erro personalizado
        // Aqui você pode adicionar lógica para lidar com erros específicos ou registrar os erros
    }
});

// Evento disparado quando ocorre uma rejeição de promessa não tratada
process.on("unhandledRejection", (reason) => {
    console.log(reason);
});
