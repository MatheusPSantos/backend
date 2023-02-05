const amqp = require('amqplib');

const msg = { number: process.argv[2] };
connect();

async function connect() {
  try {
    const amqpServer = "amqps://srxuqfsd:Rf4BY_OvBU3gGCWJp4we9If0GJO7Fz1i@jackal.rmq.cloudamqp.com/srxuqfsd";
    const connection = await amqp.connect(amqpServer);
    const channel = await connection.createChannel();
    await channel.assertQueue("jobs");
    await channel.sendToQueue("jobs", Buffer.from(JSON.stringify(msg)));
    console.log(`Job sent successfully ${msg.number}`);
    await channel.close();
    await connection.close();
  } catch (error) {
    console.error(error);
  }
}