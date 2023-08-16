const http = require('node:http');
const Producer = require('../libs/producer');
const Consumer = require('../libs/consumer');
const logger = require('../libs/logger');
const { RABBITMQ_URI, HOST_NAME, PORT } = require('../config');

const consumer = new Consumer('m2', RABBITMQ_URI);
const producer = new Producer('m1', RABBITMQ_URI);

const tasks = [];

const messageHandler = (message) => tasks.push(message);

const main = http.createServer(async (request, response) => {
  const task = {
    requestId: 2,
    request,
  };

  logger.info(`New request: ${task.requestId}`);
  await producer.sendMessage(task);

  const intervalObj = setInterval(() => {
    const result = tasks.find((res) => res.requestId === task.requestId);
    if (result) {
      logger.info(`Request done: ${result.requestId}`);
      response.statusCode = 200;
      response.setHeader('Content-Type', 'text/plain');
      response.end(result.task);
      clearInterval(intervalObj);
    }
  }, 500);
});

main.listen(PORT, HOST_NAME, () => {
  logger.info(`Server running at http://${HOST_NAME}:${PORT}/`);
});

consumer.consume(messageHandler);
