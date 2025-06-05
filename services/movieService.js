const Movie = require('../models/movies');

class MovieService {
    async getMovie(movieId) {
        const movie = await Movie.findOne({ id: movieId });
        if (!movie) {
            throw new Error(`Movie with ID ${movieId} not found.`);
        }
        return movie;
    }

    async createMovie(movieName, durationInMinutes) {
        const lastMovie = await Movie.findOne().sort({ id: -1 });
        const movieId = lastMovie ? lastMovie.id + 1 : 1;

        const movie = new Movie({
            id: movieId,
            movieName,
            movieDurationInMinutes: durationInMinutes
        });
        return await movie.save();
    }
}

module.exports = new MovieService();
