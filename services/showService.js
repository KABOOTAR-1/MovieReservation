const Show = require('../models/show');

async function getShow(showId) {
    const show = await Show.findOne({ id: showId })
        .populate('movie')
        .populate('screen');
    if (!show) throw new Error(`Show with ID ${showId} not found.`);
    return show;
}

async function createShow(movie, screen, startTime, durationInMinutes) {
    const lastShow = await Show.findOne().sort({ id: -1 });
    const showId = lastShow ? lastShow.id + 1 : 1;

    const show = new Show({
        id: showId,
        movie: movie._id,
        screen: screen._id,
        startTime,
        durationInMinutes
    });
    return await show.save();
}

async function getShowsForScreen(screen) {
    return await Show.find({ screen: screen._id })
        .populate('movie');
}

module.exports = {
    getShow,
    createShow,
    getShowsForScreen
};
