import net from 'net';

const server = net.createServer(socket => {
  console.log(`Handshake TCP feito com sucesso com ${socket.remoteAddress}:${socket.remotePort}`);
  socket.write(`Hello cliente`);
  socket.on('data', (data) => {
    console.log(`dado recebido: ${data.toString()}`);
  });
});

server.listen(8800, `127.0.0.1`);