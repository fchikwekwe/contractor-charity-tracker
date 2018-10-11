const mongoose = require('mongoose');
const Schema = mongoose.Schema

const Donation = mongoose.model('Donation', {
    charity: String,
    amount: Number,
    date: Date,
    notes: String,
    eventId: { type: Schema.Types.ObjectId, ref: 'Event'}
})

module.exports = Donation;
