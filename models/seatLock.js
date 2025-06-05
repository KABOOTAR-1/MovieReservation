const mongoose = require('mongoose');

const seatLockSchema = new mongoose.Schema({
    seat: { type: mongoose.Schema.Types.ObjectId, ref: 'Seat', required: true },
    show: { type: mongoose.Schema.Types.ObjectId, ref: 'Show', required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    timestamp: { type: Date, required: true },
    lockTimeout: { type: Number, required: true }
});

seatLockSchema.methods.isLockExpired = function() {
    return Date.now() - this.timestamp > this.lockTimeout;
};

const SeatLock = mongoose.model('SeatLock', seatLockSchema);
module.exports = { SeatLock };
