const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');
const auth = require('../middleware/auth');

router.post('/', auth, movieController.createMovie);
router.get('/:id', auth, movieController.getMovie);

module.exports = router;
