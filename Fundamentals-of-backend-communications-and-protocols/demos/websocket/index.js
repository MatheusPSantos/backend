const http = require('http');
const WebSocketServer = require('websocket').server;
let connections = [];

const httpserver = http.createServer();
const websocket = new WebSocketServer({ 'httpServer': httpserver });

httpserver.listen(8080, () => console.log(`server is listening on port ${8080}`));

websocket.on('request', request => {
  const connection = request.accept(null, request.origin);
  connection.on('message', message => {
    connections.forEach(c => c.send(`Usuario ${connection.socket.remotePort} says: ${message.utf8Data}`));
  });

  connections.push(connection);

  connections.forEach(c => c.send(`Usuario ${connection.socket.remotePort} disconectou.`));
});

