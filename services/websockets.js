const Websocket = require('ws')

const wss = new Websocket.Server({ port: 8080 })

wss.on ('connection', ws => {
    ws.on('message', message => {
        websocketSendToAll(`${message}`);
        console.log(`Received message => ${message}`)
    })
    ws.send('Hello! Message from the Server!')
})

function websocketSendToAll(text) {
    wss.clients.forEach(function each (client){
        if (client.readyState === Websocket.OPEN) {
            client.send(text);
        }
    });
}