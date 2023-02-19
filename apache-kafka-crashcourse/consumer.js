const { Kafka } = require('kafkajs');

const run = async () => {
  const kafka = new Kafka({
    clientId: 'aplicacao',
    ssl: false,
    brokers: [
      'localhost:9092'
    ]
  });

  const consumer = kafka.consumer({
    groupId: `teste`,
  });

  console.info('conectando ...');
  await consumer.connect();

  await consumer.subscribe({
    topic: 'Users',
    fromBeginning: true,
  });

  await consumer.run({
    eachMessage: async result => {
      console.info(`
      {
        topic: ${result.topic},
        partition: ${result.partition},
        message: ${result.message.value.toString()}
      },
      `);
    },
  });
};


run();