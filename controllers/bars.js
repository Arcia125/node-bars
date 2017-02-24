'use strict';

const express = require(`express`);
const router = express.Router();
const db = require(`../db`);

module.exports = function () {
    // Use yelp's search api with the same string parameters.
    router.post(`/go`, (req, res) => {
        if (!req.user) {
            console.log(`error no user`);
            res.status(401).send({ error: `User not found` });
            return;
        }
        const bars = db.get().collection(`bars`);
        const bar = req.body.bar;
        bars.findOne({ barId: bar })
            .then((barObj) => {
                if (!barObj) {
                    bars.insertOne({
                        barId: bar,
                        going: [req.user.twitterUsername],
                    })
                        .then((inserted) => {
                            res.send({
                                result: `added`,
                                count: 1,
                            });
                        })
                        .catch((insertErr) => {
                            res.send({
                                result: ``,
                                count: 0,
                                err: insertErr,
                            });
                        });
                    return;
                } else {
                    const count = barObj.going.length;
                    if (barObj.going.indexOf(req.user.twitterUsername) !== -1) {
                        bars.update({
                            barId: bar,
                        }, {
                            $pull: { going: req.user.twitterUsername },
                        })
                            .then((updateResult) => {
                                res.send({
                                    result: `removed`,
                                    count: count - 1,
                                });
                            })
                            .catch((updateErr) => {
                                res.send({
                                    result: ``,
                                    count,
                                    err: updateErr,
                                });
                            });
                    } else {
                        bars.update({
                            barId: bar,
                        }, {
                            $push: { going: req.user.twitterUsername },
                        })
                            .then((updateResult) => {
                                res.send({
                                    result: `added`,
                                    count: count + 1,
                                });
                            })
                            .catch((updateErr) => {
                                res.send({
                                    result: ``,
                                    count,
                                    err: updateErr,
                                });
                            });
                    }
                }
            })
            .catch((err) => {
                console.log(err);
            });
    });

    return router;
};
