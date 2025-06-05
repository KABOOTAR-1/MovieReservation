const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookingStatus = {
    CREATED: 'CREATED',
    CONFIRMED: 'CONFIRMED',
    EXPIRED: 'EXPIRED'
};

const bookingSchema = new Schema({
    id: {
        type: Number,       // Changed from String to Number for consistency
        required: true,
        unique: true
    },
    show: {
        type: Schema.Types.ObjectId,
        ref: 'Show',
        required: true
    },
    seatsBooked: [{
        type: Schema.Types.ObjectId,
        ref: 'Seat'
    }],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    bookingStatus: {
        type: String,
        enum: Object.values(BookingStatus),
        default: BookingStatus.CREATED
    }
}, {
    timestamps: true        // Add timestamps for booking tracking
});

bookingSchema.methods.isConfirmed = function() {
    return this.bookingStatus === BookingStatus.CONFIRMED;
};

bookingSchema.methods.confirmBooking = async function() {
    if (this.bookingStatus !== BookingStatus.CREATED) {
        throw new Error('Cannot confirm a booking that is not in the Created state.');
    }
    this.bookingStatus = BookingStatus.CONFIRMED;
    return await this.save();
};

bookingSchema.methods.expireBooking = async function() {
    if (this.bookingStatus !== BookingStatus.CREATED) {
        throw new Error('Cannot expire a booking that is not in the Created state.');
    }
    this.bookingStatus = BookingStatus.EXPIRED;
    return await this.save();
};

const Booking = mongoose.model('Booking', bookingSchema);
module.exports = { Booking, BookingStatus };
