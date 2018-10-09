const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const should = chai.should();
const Donation = require('../models/donation');

const sampleDonation = {
    "charity": "Great Cause Fund",
    "amount": "1000",
    "notes": "gave lots of money."
}

const sampleDonation2 = {
    "amount": "9000",
    "notes": "extremely specific note for mocha tests that will not result in accidental deletion of real donation."
}

chai.use(chaiHttp);

describe('Donations', () => {

    after(() => {
        Donation.deleteMany({charity: 'Great Cause Fund'}).exec((err, donations) =>{
            console.log(donations)
            // donations.remove();
        })
    });

    after(() => {
        Donation.deleteMany({notes: "extremely specific note for mocha tests that will not result in accidental deletion of real donation."}).exec((err, donations) =>{
            console.log(donations)
            // donations.remove();
        })
    });

    // Test donations new route
    it('should display new form on /donations/new GET', (done) => {
        chai.request(server)
            .get(`/donations/new`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.be.html
                    done();
                });
    });

    // Test donations show route
    it('should show a single donation on /donations/<id> GET', (done) => {
        var donation = new Donation(sampleDonation);
        donation.save((err, data) => {
            chai.request(server)
                .get(`/donations/${data._id}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.be.html
                    done();
                });
        });
    });

    // Test donations edit route
    it('should edit a single donation on /donations/<id>/edit GET', (done) => {
        var donation = new Donation(sampleDonation);
        donation.save((err, data) => {
            chai.request(server)
                .get(`/donations/${data._id}/edit`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.be.html
                    done();
                });
        });
    });

    // Test donations create route
    it('should create a single donation on /donations POST', (done) => {
        chai.request(server)
            .post('/donations')
            .send(sampleDonation)
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.html
                done();
            });
    });
    // Test  create associated donations route; NOT WORKING
    it('should create a single donation on /events/:id/donations POST', (done) => {
        chai.request(server)
            .post(`/events/${data._id}/donations`)
            .send(sampleDonation2)
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.html
                done();
            });
    });

    // Test donations update route
    it('should update a single donation on /donations/<id> PUT', (done) => {
        var donation = new Donation(sampleDonation);
        donation.save((err, data) => {
            chai.request(server)
            .put(`/donations/${data._id}?_method=PUT`)
            .send({'title': 'Updating the title'})
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.html
                done();
            });
        });
    });

    //Test donations delete route
    it('should delete a single donation on /donations/<id> DELETE', (done) => {
        var donation = new Donation(sampleDonation);
        donation.save((err, data) => {
            chai.request(server)
            .delete(`/donations/${data._id}?_method=DELETE`)
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.html
                done();
            });
        });
    });
})
