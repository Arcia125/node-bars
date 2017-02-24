'use strict';

const express = require(`express`);
const router = express.Router();
const db = require(`../db`);

module.exports = function (yelpApi) {
    // Use yelp's search api with the same string parameters.
    router.get(`/search/:paramString`, (req, res) => {
        const paramString = req.params.paramString;
        yelpApi.search({ paramString }, (body) => {
            res.send(body);
        });
    });

    // Use yelp's search api to find bars at the given location.
    router.get(`/search/location/:location/:offset`, (req, res) => {
        const location = req.params.location;
        const offset = req.params.offset;
        yelpApi.search({ location, categories: `bars`, offset }, (body) => {
            if (body.error) {
                res.status(404).send(body.error);
                return;
            }
            const barsCollection = db.get().collection(`bars`);
            let bars = [];
            const barCount = body.businesses.length;
            body.businesses.forEach((bar, barIndex) => {
                barsCollection.findOne({ barId: bar.id })
                    .then((barObj) => {
                        if (barObj) {
                            if (req.user && barObj.going.indexOf(req.user.twitterUsername) !== -1) {
                                bar.userIsGoing = true;
                            } else {
                                bar.userIsGoing = false;
                            }
                            bar.going = barObj.going.length;
                        } else {
                            bar.userIsGoing = false;
                            bar.going = 0;
                        }
                        bars.push(bar);
                        if (barIndex + 1 >= barCount) {
                            res.send(bars);
                        }
                    })
                    .catch((findErr) => {
                        console.log(findErr);
                    });
            });
            // res.send(body);
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
