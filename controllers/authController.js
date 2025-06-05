const User = require('../models/user');
const jwt = require('jsonwebtoken');

class AuthController {
    async signup(req, res) {
        try {
            const { name, emailAddress, password } = req.body;
            
            const existingUser = await User.findOne({ emailAddress });
            if (existingUser) {
                return res.status(400).json({ error: 'Email already registered' });
            }

            const user = new User({
                name,
                emailAddress,
                password
            });

            await user.save();
            
            const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
            res.status(201).json({ token, user });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async login(req, res) {
        try {
            const { emailAddress, password } = req.body;
            
            const user = await User.findOne({ emailAddress });
            if (!user) {
                return res.status(401).json({ error: 'Invalid credentials' });
            }

            const isMatch = await user.verifyPassword(password);
            if (!isMatch) {
                return res.status(401).json({ error: 'Invalid credentials' });
            }

            const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
            res.json({ token, user });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

module.exports = new AuthController();
