const qrcode = require('qrcode-terminal');
const fs = require('fs');
const { Client , LegacySessionAuth ,  LocalAuth , MessageMedia} = require('whatsapp-web.js');

const client = new Client({
    authStrategy: new LocalAuth({
         clientId: "client-one" //Un identificador(Sugiero que no lo modifiques)
    })
})

client.on('authenticated', (session) => {
    //NO ES NECESARIO PERO SI QUIERES AGREGAS UN console.log
    //sessionData = session;
    //fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), (err) => {
    //    if (err) {
    //        console.error(err);
    //    }
    //});
});

client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('Client is ready!');
});

const send_message = [
    "919949108434",
    "919014495417"
]

client.on("ready", async () => {
    console.log("Sending");

    for (const value of send_message) {
        const chatId = value + "@c.us";
        const media = await MessageMedia.fromUrl('https://www.rudraksha-ratna.com/uploads/files/0030483632.jpg');

        await client.sendMessage(chatId, media);
        console.log("Sent");
    }
});

client.initialize();
