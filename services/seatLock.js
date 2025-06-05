class SeatLock {
    constructor(seat, show, timeoutInSeconds, lockTime, lockedBy) {
        this.seat = seat;
        this.show = show;
        this.timeoutInSeconds = timeoutInSeconds;
        this.lockTime = lockTime;
        this.lockedBy = lockedBy;
    }

    isLockExpired() {
        const lockInstant = this.lockTime.getTime() + (this.timeoutInSeconds * 1000);
        const currentInstant = new Date().getTime();
        return lockInstant < currentInstant;
    }
}

module.exports = SeatLock;
