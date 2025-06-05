const TheatreService = require('../services/theatreService');

class TheatreController {
    async createTheatre(req, res) {
        try {
            const { theatreName } = req.body;
            const theatre = await TheatreService.createTheatre(theatreName);
            res.status(201).json({ theatreId: theatre.id });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async createScreen(req, res) {
        try {
            const { screenName, theatreId } = req.body;
            const theatre = await TheatreService.getTheatre(theatreId);
            const screen = await TheatreService.createScreenInTheatre(screenName, theatre);
            res.status(201).json({ screenId: screen.id });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async createSeat(req, res) {
        try {
            const { rowNo, seatCategory, screenId } = req.body;
            const screen = await TheatreService.getScreen(screenId);
            const seat = await TheatreService.createSeatInScreen(rowNo, seatCategory, screen);
            res.status(201).json({ seatId: seat.id });
        } catch (error) {
            res.status(400).json({ error: error.message });
            
        }
    }
}

module.exports = new TheatreController();
