const { Kafka } = require('kafkajs');

const msg = process.argv[2];

const run = async () => {
  const kafka = new Kafka({
    clientId: 'aplicacao',
    ssl: false,
    brokers: [
      'localhost:9092'
    ]
  });

  const producer = kafka.producer();

  const partition = msg[0] < "N" ? 0 : 1;

  console.info('conectando ...');
  await producer.connect();
  console.info('conectado!');
  const result = await producer.send({
    topic: "Users",
    messages: [
      { value: msg, partition: partition }
    ]
  });
  console.info("mensagem enviada...");
  console.info(result);
  await producer.disconnect();
  console.info('disconectado ...');
};


run();