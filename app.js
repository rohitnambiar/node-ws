const WebSocket = require('ws');
const PORT = 4001;

const wss = new WebSocket.Server({ port: PORT });

let db = [];

wss.broadcast = (data) => {
    wss.clients.forEach((client) => {
        client.send(`${JSON.stringify(data)}`);
    });
};

wss.on('connection', (ws) => {
    ws.on('message', (data) => {
        db.push(data)
        wss.broadcast(db)
    });
});