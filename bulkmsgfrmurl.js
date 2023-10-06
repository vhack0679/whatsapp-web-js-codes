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
    "91",
    "91"
]

client.on("ready", async () => {
    console.log("Sending");

    let successfulCount = 0;
    let unsuccessfulCount = 0;

    for (const value of send_message) {
        const chatId = value + "@c.us";
        const media = await MessageMedia.fromUrl('https://www.rudraksha-ratna.com/uploads/files/0030483632.jpg');

        try {
            await client.sendMessage(chatId, media);
            successfulCount++;
            console.log(`Message sent to ${chatId}`);
        } catch (error) {
            unsuccessfulCount++;
            console.error(`Failed to send message to ${chatId}: ${error}`);
        }
    }

    console.log(`Total messages sent successfully: ${successfulCount}`);
    console.log(`Total messages failed to send: ${unsuccessfulCount}`);
});


client.initialize();
