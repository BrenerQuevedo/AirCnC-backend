const Booking = require('../models/Booking');

module.exports = {
    async store(req, res) {
        const {booking_id} = req.params;

        const booking = await Booking.findById(booking_id).populate('spot');

        //booking.approved = (booking.approved == null ? true: res.status(403).json({'error': 'Spot already in use'}));
    

        await booking.save();

        return res.json(booking);
    }
};