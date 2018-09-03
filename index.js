const database = require('./adapter/database-handler');

const amqp = require('amqplib/callback_api');
const exchange_name = 'film.analytics.events';
const queue_name = 'film.analytics';

const args = process.argv.slice(2);
database.connect();

const onMessageReceived = (msg) => {
    const FilmRepository = require('./adapter/films-repository');
    const MongoFilmRepository = require('./adapter/mongo-film-repository');
    const filmRepository = new FilmRepository(new MongoFilmRepository());

    const { fields: { routingKey }, content } = msg;
    const filmId = content.toString();
    
    switch (routingKey) {
        case 'film.view': 
            const FilmViewed = require('./use-case/film-viewed');
            new FilmViewed(filmRepository).execute(filmId);
            break;
        case 'film.download': 
            const FilmDownloaded = require('./use-case/film-downloaded');
            new FilmDownloaded(filmRepository).execute(filmId);
            break;
        default:
            return;
    }
};

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

