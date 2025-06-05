const mongoose = require('mongoose');

const SeatCategory = {
    SILVER: 'SILVER',
    GOLD: 'GOLD',
    PLATINUM: 'PLATINUM'
};

const seatSchema = new mongoose.Schema({
    id: {                  
        type: Number,
        required: true,
        unique: true
    },
    row: {
        type: Number,
        required: true
    },
    seatCategory: {
        type: String,
        enum: Object.values(SeatCategory),
        required: true
    }
});

module.exports = {
    SeatCategory,
    Seat: mongoose.model('Seat', seatSchema)
};
