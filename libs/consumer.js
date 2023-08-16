const amqp = require('amqplib');

class Consumer {
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

  async consume(messageHandler) {
    if (!this.channel) {
      await this.createChanel();
    }
    await this.channel.assertQueue(this.queue, {
      durable: false,
    });

    this.channel.consume(this.queue, (msg) => {
      const data = JSON.parse(msg.content.toString());
      messageHandler(data);
      this.channel.ack(msg);
    });
  }
}

module.exports = Consumer;
