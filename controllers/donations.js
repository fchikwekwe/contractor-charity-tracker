const Donation = require('../models/donation.js');
const Event = require('../models/event.js')

module.exports = function (app) {
    // New; allow user to create standalone donations
    app.get('/donations/new', (req, res) => {
        res.render('donations-new', {
        })
    })

    // Create standalone donations
    app.post('/donations', (req, res) => {
        // console.log(req.body);
        Donation.create(req.body).then((donation) => {
            // res.render('donations-show', { donation: donation })
            res.redirect('/'); // (`/events/${req.params.movieId}`)
        }).catch((err) => {
            console.log(err.message);
        })
    })
    // Create donations associated with event and show event afterwards
    app.post('/events/:id/donations', (req, res) => {
        // console.log("body", req.body);
        // console.log("param", req.body.eventId);
        Donation.create(req.body).then((donation) => {
            // res.render('events-show', { events: events, donation: donation })
            res.redirect(`/events/${req.body.eventId}`);
        }).catch((err) => {
            console.log(err.message);
        })
    })

    // Show
    app.get('/donations/:id', (req, res) => {
        // res.send('events here!')
        Donation.findById(req.params.id)
        .then((donation) => {
            res.render('donations-show', { donation: donation });
        }).catch(err => {
            console.log(err.message);
        })

    })
    // Edit
    app.get('/donations/:id/edit', (req, res) => {
        Donation.findById(req.params.id, function(err, donation) {
            res.render('donations-edit', { donation: donation })
        }).catch(err => {
            console.log(err.message);
        })
    })
    // Update
    app.put('/donations/:id', (req, res) => {
        Donation.findByIdAndUpdate(req.params.id, req.body)
        .then(donation => {
            res.redirect(`/donations/${donation._id}`)
        }).catch(err => {
            console.log(err.message)
        })
    })
    // Delete
    app.delete('/donations/:id', function (req, res) {
        console.log('Deleted donation!')
        Donation.findByIdAndRemove(req.params.id)
        .then((donation) => {
            res.redirect('/');
        }).catch(err => {
            console.log(err.message);
        })
    })

}
