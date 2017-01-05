const express = require(`express`);
const router = express.Router();

module.exports = function (passport, yelpApi) {
    router.get(`/`, (req, res) => {
        res.send(`home`);
    });

    router.use(`/auth`, require(`./auth`)(passport));

    router.use(`/api`, require(`./api`)(yelpApi));
    return router;
};
