const mongoose = require('mongoose');
mongoose.connect(process.env.MONGOBD_URI || 'mongodb://localhost/charity-tracker', {useNewUrlParser: true});


const Event = mongoose.model('Event', {
    title: String,
    charity: String,
    date: Date,
    notes: String,
    eventId: { type: String, required: true }
});

module.exports = Event;
