const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const screenSchema = new Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    theatre: {
        type: Schema.Types.ObjectId,
        ref: 'Theatre',
        required: true
    },
    seats: [{
        type: Schema.Types.ObjectId,
        ref: 'Seat'
    }]
});

// Instance methods
screenSchema.methods.addSeat = function(seat) {
    this.seats.push(seat);
    return this.save();
};

// Create and export model
const Screen = mongoose.model('Screen', screenSchema);
module.exports = Screen;
