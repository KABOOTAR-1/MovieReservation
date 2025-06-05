const bookingFailures = new Map();

class PaymentService {
    constructor(paymentStrategy, bookingService) {
        this.paymentStrategy = paymentStrategy;
        this.bookingService = bookingService;
    }

    async processPaymentFailed(bookingId, user) {
        const booking = await this.bookingService.getBooking(bookingId);
        
        if (!booking.user.equals(user._id)) {
            throw new Error('Only the booking owner can report payment failure.');
        }

        const currentFailures = bookingFailures.get(bookingId) || 0;
        bookingFailures.set(bookingId, currentFailures + 1);
        
        console.log(`Could not process the payment for Booking with ID : ${bookingId}`);
    }

    async processPayment(bookingId, emailAddress) {
        const success = await this.paymentStrategy.processPayment();
        if (success) {
            const booking = await this.bookingService.getBooking(bookingId);
            console.log(`Payment successful for Booking with ID: ${bookingId} , User Email: ${emailAddress}`);
            await this.bookingService.confirmBooking(booking, emailAddress);
        } else {
            await this.processPaymentFailed(bookingId, user);
        }
    }
}

module.exports = PaymentService;
