const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const should = chai.should();
const Event = require('../models/event');
const Donation = require('../models/donation');

const sampleEvent = {
    "title": "Great Cause Benefit",
    "charity": "Great Cause Fund",
    "notes": "great event. gave lots of money."
}

const sampleEventDonation = {
    "amount": "9000",
    "notes": "extremely specific note for mocha tests that will not result in accidental deletion of real donation."
}

chai.use(chaiHttp);

describe('Events', () => {

    after(() => {
        Event.deleteMany({title: 'Great Cause Benefit'}).exec((err, events) =>{
            console.log(events)
            events.remove();
        })

        Event.deleteMany({title: 'Updating the title'}).exec((err, events) =>{
            console.log(events)
            events.remove();
        })

        Donation.deleteMany({notes: "extremely specific note for mocha tests that will not result in accidental deletion of real donation."}).exec((err, donations) =>{
            console.log(donations)
            // donations.remove();
        })
    });

    // Test events index
    it('should index ALL events on / GET', (done) => {
        chai.request(server)
            .get('/')
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.html;
                done();
            });
    });

    // Test events new route
    it('should display new form on /events/new GET', (done) => {
        chai.request(server)
            .get(`/events/new`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.be.html
                    done();
                });
    });

    // Test events show route
    it('should show a single event on /events/<id> GET', (done) => {
        var event = new Event(sampleEvent);
        event.save((err, data) => {
            chai.request(server)
                .get(`/events/${data._id}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.be.html
                    done();
                });
        });
    });

    // Test events edit route
    it('should edit a single event on /events/<id>/edit GET', (done) => {
        var event = new Event(sampleEvent);
        event.save((err, data) => {
            chai.request(server)
                .get(`/events/${data._id}/edit`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.be.html
                    done();
                });
        });
    });

    // Test events create route
    it('should create a single event on /events POST', (done) => {
        chai.request(server)
            .post('/events')
            .send(sampleEvent)
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.html
                done();
            });
    });

    // Test events update route
    it('should update a single event on /events/<id> PUT', (done) => {
        var event = new Event(sampleEvent);
        event.save((err, data) => {
            chai.request(server)
            .put(`/events/${data._id}?_method=PUT`)
            .send({'title': 'Updating the title'})
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.html
                done();
            });
        });
    });

    //Test events delete route
    it('should delete a single event on /events/<id> DELETE', (done) => {
        var event = new Event(sampleEvent);
        event.save((err, data) => {
            chai.request(server)
            .delete(`/events/${data._id}?_method=DELETE`)
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.html
                done();
            });
        });
    });

    // Test create associated donations route; NOT WORKING
    it('should create a single donation on /events/:id/donations POST', (done) => {
        // CREATE SAMPLE EVENT
        var event = new Event(sampleEvent);
        // SAVE SAMPLE EVENT
        event.save((err, data) => {
            chai.request(server)
                // SEND POST REQUEST TO URL
                .post(`/events/${data._id}/donations`)
                // SEND IN SAMPLE EVENT DONATION
                .send(sampleEventDonation)
                // RESPOND 
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.be.html
                    done();
                });
        })
    })

})
