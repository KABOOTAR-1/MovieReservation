const MovieService = require('../services/movieService');

class MovieController {
    async createMovie(req, res) {
        try {
            const { movieName, durationInMinutes } = req.body;
            const movie = await MovieService.createMovie(movieName, durationInMinutes);
            res.status(201).json({ movieId: movie.id });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async getMovie(req, res) {
        try {
            const movie = await MovieService.getMovie(req.params.id);
            res.status(200).json(movie);
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    }
}

module.exports = new MovieController();
