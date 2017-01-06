'use strict';

const express = require(`express`);
const router = express.Router();

module.exports = function (yelpApi) {
    // Use yelp's search api with the same string parameters.
    router.get(`/search/:paramString`, (req, res) => {
        const paramString = req.params.paramString;
        yelpApi.search({ paramString }, (body) => {
            res.send(body);
        });
    });

    // Use yelp's search api to find bars at the given location.
    router.get(`/search/location/:location`, (req, res) => {
        const location = req.params.location;
        yelpApi.search({ location, categories: `bars` }, (body) => {
            res.send(body);
        });
    });

    return router;
};
