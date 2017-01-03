const express = require(`express`);
const router = express.Router();

module.exports = function (passport) {
    router.get(`/twitter`, passport.authenticate(`twitter`));

    router.get(`/twitter/callback`, passport.authenticate(`twitter`, {
        successRedirect: `/`,
        failureRedirect: `/`,
    }));
    return router;
};
