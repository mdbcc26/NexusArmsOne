const WebSocket = require('ws')
const wss = new WebSocket.Server({ port: 8080 })
wss.on('connection', ws => {
    ws.on('message', message => {
        websocketSendToAll(`${message}`);
        console.log(`Received message => ${message}`)
    })
    ws.send('Hello! Message From Server!!')
})

function websocketSendToAll(text) {
    wss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
            client.send(text);
        }
    });
}
