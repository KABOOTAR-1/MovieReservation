const showService = require('../services/showService');
const theatreService = require('../services/theatreService');
const { bookingService } = require('../services/container');
const User = require('../models/user');

async function createBooking(req, res) {
    try {
        const { emailAddress, showId, seatIds } = req.body;
        console.log(`Creating booking for email: ${emailAddress}, showId: ${showId}, seatIds: ${seatIds}`);
        
        const user = await User.findOne({ emailAddress: emailAddress });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const show = await showService.getShow(showId);
        const seats = await Promise.all(
            seatIds.map(seatId => theatreService.getSeat(seatId))
        );

        const booking = await bookingService.createBooking(user, show, seats);
        res.status(201).json({ bookingId: booking.id });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = {
    createBooking
};
