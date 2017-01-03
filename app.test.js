'use strict';

process.env.NODE_ENV = `test`;

const chai = require(`chai`);
const chaiHttp = require(`chai-http`);
const app = require(`./app`);
const should = chai.should();


chai.use(chaiHttp);

describe(`App`, function () {
    it(`Should respond with response code 300 at /`, function (done) {
        chai.request(app)
        .get(`/`)
        .end(function (err, res) {
            res.should.have.status(200);
            done();
        });
    });
    it(`Should respond with response code 302 at /auth/twitter`, function (done) {
        chai.request(app)
        .get(`/auth/twitter`)
        .end(function (err, res) {
            res.should.have.status(302);
        });
    });
});