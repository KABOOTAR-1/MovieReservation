const Booking = require("../models/Booking").Booking;
const User = require("../models/user");

class BookingService {
  constructor(seatLockProvider) {
    this.seatLockProvider = seatLockProvider;
  }

  async getBooking(bookingId) {
    const booking = await Booking.findOne({ id: bookingId });
    if (!booking) throw new Error(`No Booking exists for the ID: ${bookingId}`);
    return booking;
  }

  async getAllBookings(show) {
    return await Booking.find({ show: show._id });
  }

  async createBooking(user, show, seats) {
    console.log("This is the uer object: ", user, show, seats);
    if (await this.isAnySeatAlreadyBooked(show, seats)) {
      throw new Error("Seat Already Booked");
    }

    await this.seatLockProvider.lockSeats(show, seats, user);

    const lastBooking = await Booking.findOne().sort({ id: -1 });
    const bookingId = lastBooking ? lastBooking.id + 1 : 1;

    const booking = new Booking({
      id: bookingId,
      show: show._id,
      user: user._id,
      seatsBooked: seats.map((seat) => seat._id),
      bookingStatus: "CREATED",
    });

    return await booking.save();
  }

  async getBookedSeats(show) {
    const confirmedBookings = await Booking.find({
      show: show._id,
      bookingStatus: "CONFIRMED",
    }).populate("seatsBooked");

    return confirmedBookings.flatMap((booking) => booking.seatsBooked);
  }

  async confirmBooking(booking, userEmail) {
    const user = await User.findOne({ emailAddress: userEmail }); // Changed 'email' to 'emailAddress'
    if (!user) {
      throw new Error("User not found with the provided email");
    }

    if (!booking.user.equals(user._id)) {
      throw new Error("Cannot confirm a booking made by another user");
    }

    for (const seat of booking.seatsBooked) {
      if (
        !(await this.seatLockProvider.validateLock(booking.show, seat, user))
      ) {
        throw new Error("Acquired Lock is either invalid or has Expired");
      }
    }

    booking.bookingStatus = "CONFIRMED";
    return await booking.save();
  }

  async isAnySeatAlreadyBooked(show, seats) {
    const bookedSeats = await this.getBookedSeats(show);
    console.log("Booked Seats: ", bookedSeats);
    return seats.some((seat) =>
      bookedSeats.some(
        (bookedSeat) => bookedSeat._id.toString() === seat._id.toString()
      )
    );
  }
}

module.exports = BookingService;
