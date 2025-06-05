const showService = require('../services/showService');
const { seatLockProvider } = require('../services/container');
const User = require('../models/user');

class SeatLockController {
    async lockSeats(req, res) {
        try {
            const { showId, seatIds, emailAddress } = req.body;
            
            const user = await User.findOne({ emailAddress });
            if (!user) {
                throw new Error('User not found with the provided email');
            }
            
            const show = await showService.getShow(showId);
            await seatLockProvider.lockSeats(show, seatIds, user);
            res.status(200).json({ message: 'Seats locked successfully' });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async unlockSeats(req, res) {
        try {
          const { showId, seatIds, emailAddress } = req.body;
            
            const user = await User.findOne({ emailAddress });
            if (!user) {
                throw new Error('User not found with the provided email');
            }
            const show = await showService.getShow(showId);
            await seatLockProvider.unlockSeats(show, seatIds, user);
            res.status(200).json({ message: 'Seats unlocked successfully' });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async getLockedSeats(req, res) {
        try {
            const { showId } = req.params;
            console.log(`Fetching locked seats for showId: ${showId}`);
            const show = await showService.getShow(showId);
            console.log(show);
            const lockedSeats = await seatLockProvider.getLockedSeats(show);
            res.status(200).json(lockedSeats);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

module.exports = {
    controller: new SeatLockController()
};
