'use strict';

const express = require(`express`);
const router = express.Router();
const db = require(`../db`);

module.exports = function () {
    // Use yelp's search api with the same string parameters.
    router.post(`/go`, (req, res) => {
        // if (!req.user) {
        //     console.log(`error no user`);
        //     res.status(401).send({ error: `User not found` });
        //     return;
        // }
        const bars = db.get().collection(`bars`);
        const bar = req.body.bar;
        console.log(`The bar:`);
        console.log(bar);
        bars.findOne({ barId: bar }, (err, doc) => {
            if (err) {
                console.log(err);
                res.send(err);
                return;
            }
            console.log(doc);
            res.send(doc);
        });
        // bars.update({ barId: bar }, { $push: { going: req.user.twitterUsername } }, { upsert: true })
    });

    return router;
};
