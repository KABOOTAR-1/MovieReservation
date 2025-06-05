const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const showSchema = new Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    movie: {
        type: Schema.Types.ObjectId,
        ref: 'Movie',
        required: true
    },
    screen: {
        type: Schema.Types.ObjectId,
        ref: 'Screen',
        required: true
    },
    startTime: {
        type: Date,
        required: true
    },
    durationInMinutes: {
        type: Number,
        required: true
    }
});

const Show = mongoose.model('Show', showSchema);
module.exports = Show;
