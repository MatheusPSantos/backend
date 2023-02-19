const { Kafka } = require('kafkajs');

const run = async () => {
  try {
    // precisa criar uma conexao ADMIN para criar um topico
    const kafka = new Kafka({
      clientId: "aplicacao",
      ssl: false,
      brokers: [
        'localhost:9092'
      ],
    });

    const admin = kafka.admin();

    console.info('conectando ...');
    await admin.connect();
    console.info('conectado!');
    await admin.createTopics({
      topics: [
        {
          topic: "Users", numPartitions: 2
        }
      ]
    });
    console.info("topico criado.");
    await admin.disconnect();
    console.info('disconectado ...');
  } catch (error) {
    console.error(`Mensagem de erro:: ${error}`);
  }
};

run();