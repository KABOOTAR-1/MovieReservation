const mongoose = require('mongoose');

const connectDB = async (url) => {
    try {
        const options = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        };

        await mongoose.connect(url, options);
        console.log('MongoDB Connected Successfully');
    } catch (error) {
        console.error('MongoDB Connection Error:', error);
        throw error; // Propagate error to handle it in app.js
    }
};

module.exports = connectDB;
