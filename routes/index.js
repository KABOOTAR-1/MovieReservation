const express = require('express');
const router = express.Router();

const authRoutes = require('./authRoutes');
const movieRoutes = require('./movieRoutes');
const theatreRoutes = require('./theatreRoutes');
const showRoutes = require('./showRoutes');
const bookingRoutes = require('./bookingRoutes');
const paymentRoutes = require('./paymentRoutes');
const seatLockRoutes = require('./seatLock'); // Add this line

// Auth routes (unprotected)
router.use('/auth', authRoutes);

// Protected routes
router.use('/movies', movieRoutes);
router.use('/theatres', theatreRoutes);
router.use('/shows', showRoutes);
router.use('/bookings', bookingRoutes);
router.use('/payments', paymentRoutes);
router.use('/seats', seatLockRoutes); // Add this line

module.exports = router;