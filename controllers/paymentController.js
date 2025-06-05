const { paymentService } = require('../services/container');

class PaymentController {
    async processPayment(req, res) {
        try {
            const { bookingId, emailAddress } = req.body;
            await paymentService.processPayment(bookingId, emailAddress);
            res.status(200).json({ message: 'Payment processed successfully' });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

module.exports = PaymentController;
