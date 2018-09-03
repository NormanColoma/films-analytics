class FilmDownloaded {
    constructor(filmRepository) {
        this._filmRepository = filmRepository;
    }

    execute(filmId) {
        this._filmRepository.incrementDownloadsOfFilm(filmId);
    }
}

module.exports = FilmDownloaded;