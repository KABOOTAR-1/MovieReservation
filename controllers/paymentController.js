const PaymentService = require('../services/paymentService');
const BookingService = require('../services/bookingService');
const { DebitCardStrategy } = require('../services/payment/paymentStrategy');
const SeatLockProvider = require('../services/seatLockProvider');

class PaymentController {
    constructor() {
        const seatLockProvider = new SeatLockProvider();
        const bookingService = new BookingService(seatLockProvider);
        this.paymentService = new PaymentService(new DebitCardStrategy(), bookingService);
    }

    async processPayment(req, res) {
        try {
            const { bookingId, emailAddress } = req.body;
            console.log(`Processing payment for bookingId: ${bookingId}, emailAddress: ${emailAddress}`);
            await this.paymentService.processPayment(bookingId, emailAddress);
            res.status(200).json({ message: 'Payment processed successfully' });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

module.exports = PaymentController;
