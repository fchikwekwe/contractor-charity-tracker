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

chai.use(chaiHttp);

describe('Donations', () => {

    after(() => {
        Donation.deleteMany({charity: 'Great Cause Fund'}).exec((err, donations) =>{
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
