const SeatLockProvider = require('./seatLockProvider');
const BookingService = require('./bookingService');
const PaymentService = require('./paymentService');
const { DebitCardStrategy } = require('./payment/paymentStrategy');

// Create singleton instances
const seatLockProvider = new SeatLockProvider(600000); // 10 minutes
const bookingService = new BookingService(seatLockProvider);
const paymentService = new PaymentService(new DebitCardStrategy(), bookingService);

module.exports = {
    seatLockProvider,
    bookingService,
    paymentService
};
