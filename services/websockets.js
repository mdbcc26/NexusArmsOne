const Websocket = require('ws')

const wss = new Websocket.Server({ port: 8080 })

wss.on ('connection', ws => {
    ws.room = "";
    ws.on('message', message => {
        websocketSendToAll(`${message}`);
        console.log(`Received message => ${message}`)
        let msg = JSON.parse(message);
        if (msg.joinRoom) {ws.room = msg.joinRoom}
        if (msg.room) {websocketSendToAll(JSON.stringify(msg))}
    })
    ws.send(JSON.stringify({message: 'Hello! Message from the Server!'}));
})

function websocketSendToAll(text) {
    wss.clients.forEach(function each (client){
        if (client.readyState === Websocket.OPEN) {
            if (client.room === JSON.parse(text).room) {
                client.send(text);
            }
        }
    });
}