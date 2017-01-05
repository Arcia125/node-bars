'use strict';

const express = require(`express`);
const router = express.Router();

module.exports = function (yelpApi) {
    router.get(`/search/:paramString`, (req, res) => {
        const paramString = req.params.paramString;
        yelpApi.search({ paramString }, (body) => {
            res.send(body);
        });
    });

    return router;
};
