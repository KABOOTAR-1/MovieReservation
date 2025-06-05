const SeatAvailabilityService = require('../services/seatAvailabilityService');
const showService = require('../services/showService');
const theatreService = require('../services/theatreService');
const movieService = require('../services/movieService');
const BookingService = require('../services/bookingService');
const SeatLockProvider = require('../services/seatLockProvider');

// Initialize dependencies
const seatLockProvider = new SeatLockProvider(600000); // 5 minutes timeout
const bookingService = new BookingService(seatLockProvider);
const seatAvailabilityService = new SeatAvailabilityService(bookingService, seatLockProvider);

async function createShow(req, res) {
    try {
        const { movieId, screenId, startTime, durationInMinutes } = req.body;

        const screen = await theatreService.getScreen(screenId);
        const movie = await movieService.getMovie(movieId);
        
        const show = await showService.createShow(
            movie, 
            screen, 
            new Date(startTime), 
            durationInMinutes
        );

        res.status(201).json({ showId: show.id });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

async function getAvailableSeats(req, res) {
    try {
        const showId = req.params.showId;
        const show = await showService.getShow(showId);
        const availableSeats = await seatAvailabilityService.getAvailableSeats(show);
        res.status(200).json(availableSeats);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}

module.exports = {
    createShow,
    getAvailableSeats
};