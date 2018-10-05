const Donation = require('../models/donation.js');

module.exports = function (app) {
    // New
    app.get('/donations/new', (req, res) => {
        res.render('donations-new', {

        }).catch(err => {
            console.log(err.message);
        })
    })
    // Create
    app.post('/donations', (req, res) => {
        console.log(req.body);
        Donation.create(req.body).then((donation) => {
            console.log(donation);
            res.render('donations-show', { donation: donation })
        //     // res.redirect('/'); // (`/events/${req.params.movieId}`)
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

}
