const Event = require('../models/event.js');

module.exports = function (app) {
    // Root
    app.get('/', (req, res) => {
        Event.find()
        .then(events => {
            res.render('index', { events: events });
        }).catch(err => {
            console.log(err);
        })

    })
}
