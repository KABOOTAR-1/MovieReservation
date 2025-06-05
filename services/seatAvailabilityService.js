class SeatAvailabilityService {
    constructor(bookingService, seatLockProvider) {
        this.bookingService = bookingService;
        this.seatLockProvider = seatLockProvider;
    }

    async getAvailableSeats(show) {
        const populatedShow = await show.populate({
            path: 'screen',
            populate: { path: 'seats' }
        });
        
        const allSeats = populatedShow.screen.seats;
        const unavailableSeats = await this.getUnavailableSeats(show);
        const unavailableSeatIds = unavailableSeats.map(seat => seat._id.toString());
        
        return allSeats.filter(seat => !unavailableSeatIds.includes(seat._id.toString()));
    }

    async getUnavailableSeats(show) {
        const bookedSeats = await this.bookingService.getBookedSeats(show);
        const lockedSeats = await this.seatLockProvider.getLockedSeats(show);
        return [...bookedSeats, ...lockedSeats];
    }
}

module.exports = SeatAvailabilityService;
