const database = require('./adapter/database-handler');
const onMessageReceived = require('./adapter/messages/listener');

const amqp = require('amqplib/callback_api');
const exchange_name = 'film.analytics.events';
const queue_name = 'film.analytics';

const args = process.argv.slice(2);
database.connect();

const onQueueAsserted = (err, queue, ch) => {
    console.log('Waiting for actions in films...');

    args.forEach(routingKey => ch.bindQueue(queue.queue, exchange_name, routingKey));
    ch.consume(queue.queue, msg => onMessageReceived(msg), {noAck: true});
};

amqp.connect('amqp://localhost', (err, conn) => {
  conn.createChannel((err, ch) => {
    ch.assertExchange(exchange_name, 'direct', {durable: false});
    ch.assertQueue(queue_name, {exclusive: false}, (err, q) => onQueueAsserted(err, q, ch));
  });
});

