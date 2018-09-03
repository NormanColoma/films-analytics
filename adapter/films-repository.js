const MongoFilmRepository = require('./mongo-film-repository');

class FilmRepository {
    constructor(mongoFilmRepository) {
        this._mongoFilmRepository = mongoFilmRepository;
    }
    
    incrementDownloadsOfFilm(id) {
        const { _mongoFilmRepository } = this;

        _mongoFilmRepository.incrementDownloadsOfFilm(id).then(({ result }) => {
            if (result.n > 0) {
                console.log(`Film ${id} was downloaded once more`);
            }
        });
    }

    incrementImpressionsOfFilm(id) {
        const { _mongoFilmRepository } = this;

        _mongoFilmRepository.incrementImpressionsOfFilm(id).then(({ result }) => {
            if (result.n > 0) {
                console.log(`Film ${id} was viewed once more`);
            }
        });
    }
}

module.exports = FilmRepository;