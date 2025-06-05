const express = require('express');
const router = express.Router();
const PaymentController = require('../controllers/paymentController');

const paymentController = new PaymentController();

router.post('/process', paymentController.processPayment.bind(paymentController));

module.exports = router;
