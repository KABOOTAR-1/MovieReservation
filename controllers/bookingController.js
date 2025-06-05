const ShowService = require('../services/showService');
const BookingService = require('../services/bookingService');
const TheatreService = require('../services/theatreService');
const SeatLockProvider = require('../services/seatLockProvider');
const User = require('../models/user');

const seatLockProvider = new SeatLockProvider(600000); // 5 minutes timeout
const bookingService = new BookingService(seatLockProvider);

class BookingController {
    constructor() {
        this.showService = ShowService;
        this.theatreService = TheatreService;
        this.bookingService = bookingService; // Keep this as constructor since BookingService is exported as class
        // Bind the method to preserve this context
        this.createBooking = this.createBooking.bind(this);
    }

    async createBooking(req, res) {
        try {
            const { emailAddress, showId, seatIds } = req.body;
            console.log(`Creating booking for email: ${emailAddress}, showId: ${showId}, seatIds: ${seatIds}`);
            const user = await User.findOne({ emailAddress: emailAddress });
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }

            const show = await this.showService.getShow(showId);
            const seats = await Promise.all(
                seatIds.map(seatId => this.theatreService.getSeat(seatId))
            );

            const booking = await this.bookingService.createBooking(user, show, seats);
            res.status(201).json({ bookingId: booking.id });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

module.exports = new BookingController();
