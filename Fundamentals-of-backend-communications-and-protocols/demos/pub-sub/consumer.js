const amqp = require('amqplib');
connect();

async function connect() {
  try {
    const connection = await amqp.connect("amqps://srxuqfsd:Rf4BY_OvBU3gGCWJp4we9If0GJO7Fz1i@jackal.rmq.cloudamqp.com/srxuqfsd");
    const channel = await connection.createChannel();
    const result = await channel.assertQueue("jobs");

    channel.consume("jobs", message => {
      const input = JSON.parse(message.content.toString());
      console.log(`Received job with input ${input.number}`);
      if (input.number == 7) channel.ack(message);
    });
    console.log('waiting for messages...');
  } catch (error) {
    console.error(error);
  }
}