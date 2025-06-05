const Theatre = require('../models/theatre');
const Screen = require('../models/screen');
const { Seat } = require('../models/seat');

class TheatreService {
    async getSeat(seatId) {
        const seat = await Seat.findOne({ id: seatId });
        if (!seat) throw new Error(`Seat with ID ${seatId} not found.`);
        return seat;
    }

    async getTheatre(theatreId) {
        const theatre = await Theatre.findOne({ id: theatreId });
        if (!theatre) throw new Error(`Theatre with ID ${theatreId} not found.`);
        return theatre;
    }

    async getScreen(screenId) {
        const screen = await Screen.findOne({ id: screenId });
        if (!screen) throw new Error(`Screen with ID ${screenId} not found.`);
        return screen;
    }

    async createTheatre(theatreName) {
        const lastTheatre = await Theatre.findOne().sort({ id: -1 });
        const theatreId = lastTheatre ? lastTheatre.id + 1 : 1;

        const theatre = new Theatre({
            id: theatreId,
            name: theatreName
        });
        return await theatre.save();
    }

    async createScreenInTheatre(screenName, theatre) {
        const screen = await this._createScreen(screenName, theatre);
        await Theatre.findByIdAndUpdate(theatre._id, {
            $push: { screens: screen._id }
        });
        return screen;
    }

    async createSeatInScreen(rowNo, seatCategory, screen) {
        const lastSeat = await Seat.findOne({}).sort({ id: -1 });
        const seatId = lastSeat ? lastSeat.id + 1 : 1;

        const seat = new Seat({
            id: seatId,
            row: rowNo,
            seatCategory
        });
        await seat.save();

        await Screen.findByIdAndUpdate(screen._id, {
            $push: { seats: seat._id }
        });
        return seat;
    }

    async _createScreen(screenName, theatre) {
        const lastScreen = await Screen.findOne().sort({ id: -1 });
        const screenId = lastScreen ? lastScreen.id + 1 : 1;

        const screen = new Screen({
            id: screenId,
            name: screenName,
            theatre: theatre._id
        });
        return await screen.save();
    }
}

module.exports = new TheatreService();
