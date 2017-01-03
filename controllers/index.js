const express = require(`express`);
const router = express.Router();

module.exports = function (passport) {
    router.get(`/`, (req, res) => {
        res.send(`home`);
    });

    router.use(`/auth`, require(`./auth`)(passport));
    return router;
};
