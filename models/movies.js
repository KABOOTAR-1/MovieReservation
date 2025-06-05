const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    movieName: {
        type: String,
        required: true
    },
    movieDurationInMinutes: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Movie', movieSchema);
