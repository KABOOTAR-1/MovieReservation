class PaymentStrategy {
    async processPayment() {
        throw new Error('processPayment method must be implemented');
    }
}

class DebitCardStrategy extends PaymentStrategy {
    async processPayment() {
        // Implement real payment gateway integration here
        return true;
    }
}

class UpiStrategy extends PaymentStrategy {
    async processPayment() {
        // Implement real UPI payment processing here
        return false;
    }
}

module.exports = {
    PaymentStrategy,
    DebitCardStrategy,
    UpiStrategy
};
