import dgram from 'dgram';

const socket = dgram.createSocket('udp4');

socket.bind(5500, "127.0.0.1");

socket.on('message', (msg, info) => {
  console.log(`servidor recebeu datagrama ${msg}, de: ${info.address}:${info.port}`);
});