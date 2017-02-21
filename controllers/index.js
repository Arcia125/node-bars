const express = require(`express`);
const router = express.Router();
const auth = require(`./auth`);
const api = require(`./api`);

module.exports = function (passport, yelpApi) {

    router.use(`/auth`, auth(passport));

    router.use(`/api/v1`, api(yelpApi));

    router.get(`*`, (req, res) => {
        res.render(`index`, { expressFlash: ``, polls: `` });
    });

    return router;
};
