const express = require('express');
const router = express.Router();
const { controller: seatLockController } = require('../controllers/seatLockController');

// Lock seats
router.post('/lock', seatLockController.lockSeats);

// Unlock seats
router.post('/unlock', seatLockController.unlockSeats);

// Get locked seats for a show
router.get('/show/:showId', seatLockController.getLockedSeats);

module.exports = router;
