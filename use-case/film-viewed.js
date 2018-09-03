class FilmViewed {
    constructor(filmRepository) {
        this._filmRepository = filmRepository;
    }

    execute(filmId) {
        this._filmRepository.incrementImpressionsOfFilm(filmId);
    }
}

module.exports = FilmViewed;