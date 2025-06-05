const express = require('express');
const router = express.Router();
const showController = require('../controllers/showController');
const auth = require('../middleware/auth');

router.post('/', auth, showController.createShow.bind(showController));
router.get('/:showId/seats', auth, showController.getAvailableSeats.bind(showController));

module.exports = router;
