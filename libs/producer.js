const amqp = require('amqplib');
const CircularJSON = require('circular-json');

class Producer {
  channel;

  connection;

  constructor(queue, uri) {
    this.queue = queue;
    this.uri = uri;
  }

  async createChanel() {
    this.connection = await amqp.connect(this.uri);
    this.channel = await this.connection.createChannel();
  }

  async sendMessage(message) {
    if (!this.channel) {
      await this.createChanel();
    }

    await this.channel.assertQueue(this.queue, {
      durable: false,
    });

    await this.channel.sendToQueue(this.queue, Buffer.from(CircularJSON.stringify(message)));
  }

  async close() {
    await this.connection.close();
  }
}

module.exports = Producer;
