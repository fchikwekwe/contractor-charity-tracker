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
    // Show
    app.get('/events/:id', (req, res) => {
        // res.send('events here!')
        Event.findById(req.params._id)
        .then(event => {
            res.render('events-show', { event: event });
        }).catch(err => {
            console.log(err.message);
        })

    })

//     // Create
    app.post('/events', (req, res) => {
        console.log(req.body);
//     Review.create(req.body).then((review) => {
//         res.redirect(`/events/${req.params.movieId}`);
//     }).catch((err) => {
//         console.log(err.message);
//     })
    })

    // New
    app.get('/events/new', (req, res) => {
        res.render('events-new', {});
    })
}
