const { SeatLock } = require("../models/seatLock");

class SeatLockProvider {
    constructor(lockTimeout = 600000) {
        this.lockTimeout = lockTimeout;
    }

    async lockSeats(show, seats, user) {
        console.log(`Locking seats for show: ${show._id}, user: ${user._id}`);

        // Check if any seat is already locked
        for (const seat of seats) {
            const existingLock = await SeatLock.findOne({
                show: show._id,
                seat: seat._id
            });

            if (existingLock && !existingLock.isLockExpired()) {
                throw new Error(`Seat ${seat.id} is already locked.`);
            } else if (existingLock) {
                await existingLock.deleteOne();
            }
        }

        // Create new locks
        const now = new Date();
        const lockPromises = seats.map(seat => 
            new SeatLock({
                seat: seat._id,
                show: show._id,
                user: user._id,
                timestamp: now,
                lockTimeout: this.lockTimeout
            }).save()
        );

        await Promise.all(lockPromises);
    }

    async validateLock(show, seat, user) {
        console.log(`Validating lock for seat: ${seat}, show: ${show}, user: ${user}`);
        const lock = await SeatLock.findOne({
            show: show,
            seat: seat,
            user: user._id
        });

        return lock && !lock.isLockExpired();
    }

    async unlockSeats(show, seats, user) {
        await SeatLock.deleteMany({
            show: show._id,
            seat: { $in: seats.map(seat => seat._id) },
            user: user._id
        });
    }

    async getLockedSeats(show) {
        console.log(`Fetching locked seats for show: ${show._id}`);
        const locks = await SeatLock.find({
            show: show._id
        }).populate('seat');

        return locks
            .filter(lock => !lock.isLockExpired())
            .map(lock => lock.seat);
    }
}

module.exports = SeatLockProvider;
