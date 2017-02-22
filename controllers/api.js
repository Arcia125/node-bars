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
            if (body.error) {
                res.status(404).send(body.error);
                return;
            }
            res.send(body);
        });
    });

    // Use yelp's business api to find the details of the given business.
    router.get(`/business/:yelpId`, (req, res) => {
        yelpApi.businessDetails({ yelpId: req.params.yelpId })
            .then((response) => {
                res.send(response);
            })
            .catch((err) => {
                res.status(404).send(err);
            });
    });

    return router;
};
