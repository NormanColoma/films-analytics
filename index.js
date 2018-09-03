const amqp = require('amqplib/callback_api');
const exchange_name = 'film.analytics.events';
const queue_name = 'film.analytics';

const args = process.argv.slice(2);

const onMessageReceived = (msg) => {
    const { fields: { routingKey }, content } = msg;

    switch (routingKey) {
        case 'film.view': 
            console.log(" [x] Film: '%s'", content.toString(), "viewed");
            break;
        case 'film.download': 
            console.log(" [x] Film: '%s'", content.toString(), "downloaded");
            break;
        default:
            return;
    }
};

const onQueueAsserted = (err, queue, ch) => {
    console.log('[*] Waiting for logs...');

    args.forEach(routingKey => ch.bindQueue(queue.queue, exchange_name, routingKey));
    ch.consume(queue.queue, msg => onMessageReceived(msg), {noAck: true});
};

amqp.connect('amqp://localhost', (err, conn) => {
  conn.createChannel((err, ch) => {
    ch.assertExchange(exchange_name, 'direct', {durable: false});
    ch.assertQueue(queue_name, {exclusive: false}, (err, q) => onQueueAsserted(err, q, ch));
  });
});

