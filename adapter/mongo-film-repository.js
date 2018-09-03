const database = require('./database-handler');
const { ObjectId } = require('mongodb');

class MongoFilmRepository {
    incrementDownloadsOfFilm(id) {
        const mongoRepository = database.getInstance().collection('film');

        return mongoRepository.updateOne(
            { '_id': ObjectId(id) },
            { $inc: { downloads: 1 } }
        );
    }

    incrementImpressionsOfFilm(id) {
        const mongoRepository = database.getInstance().collection('film');

        return mongoRepository.updateOne(
            { '_id': ObjectId(id) },
            { $inc: { impressions: 1 } }
        );
    }
}

module.exports = MongoFilmRepository;