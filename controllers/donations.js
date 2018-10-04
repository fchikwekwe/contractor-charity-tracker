const Donation = require('../models/donation.js');

module.exports = function (app) {
    // New
    app.get('/donations/new', (req, res) => {
        res.render('donations-new', {});
    })
    // Create
    app.post('/donations', (req, res) => {
        console.log(req.body);
        Donation.create(req.body).then((donation) => {
            console.log(donation);
            res.render('donations-show', { donation: donation })
        //     // res.redirect('/'); // (`/events/${req.params.movieId}`)
        // }).catch((err) => {
        //     console.log(err.message);
        })
    })

}
