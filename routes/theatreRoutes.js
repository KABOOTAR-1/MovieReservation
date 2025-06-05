const express = require('express');
const router = express.Router();
const theatreController = require('../controllers/theatreController');
const auth = require('../middleware/auth');

router.post('/', auth, theatreController.createTheatre);
router.post('/screen', auth, theatreController.createScreen);
router.post('/seat', auth, theatreController.createSeat);

module.exports = router;
