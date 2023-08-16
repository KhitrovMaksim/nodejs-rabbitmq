const Producer = require('../libs/producer');
const { RABBITMQ_URI } = require('../config');
const Consumer = require('../libs/consumer');
const logger = require('../libs/logger');

const producer = new Producer('m2', RABBITMQ_URI);
const consumer = new Consumer('m1', RABBITMQ_URI);
const messageHandler = (message) => {
  setTimeout(async () => {
    logger.info(`Processing request: ${message.requestId}`);
    const result = { requestId: message.requestId, task: 'done' };
    await producer.sendMessage(result);
  }, 1000);
};

consumer.consume(messageHandler);
