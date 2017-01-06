const express = require(`express`);
const router = express.Router();
const auth = require(`./auth`);
const api = require(`./api`);

module.exports = function (passport, yelpApi) {
    router.get(`/`, (req, res) => {
        res.render(`index`, { username: `me`, expressFlash: ``, polls: `` });
    });

    router.use(`/auth`, auth(passport));

    router.use(`/api`, api(yelpApi));

    return router;
};
