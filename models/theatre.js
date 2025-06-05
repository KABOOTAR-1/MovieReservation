const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const theatreSchema = new Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    screens: [{
        type: Schema.Types.ObjectId,
        ref: 'Screen'
    }]
});

// Instance method to add a screen
theatreSchema.methods.addScreen = function(screen) {
    this.screens.push(screen);
    return this.save();
};

const Theatre = mongoose.model('Theatre', theatreSchema);
module.exports = Theatre;
