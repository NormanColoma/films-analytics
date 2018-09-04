const FilmRepository = require('../films-repository');
const MongoFilmRepository = require('../mongo-film-repository');
const filmRepository = new FilmRepository(new MongoFilmRepository());

const onMessageRecieved = (msg) => {
    const { fields: { routingKey }, content } = msg;
    const filmId = content.toString();
    
    switch (routingKey) {
        case 'film.view': 
            const FilmViewed = require('../../use-case/film-viewed');
            new FilmViewed(filmRepository).execute(filmId);
            break;
        case 'film.download': 
            const FilmDownloaded = require('../../use-case/film-downloaded');
            new FilmDownloaded(filmRepository).execute(filmId);
            break;
        default:
            return;
    }
}

module.exports = onMessageRecieved;