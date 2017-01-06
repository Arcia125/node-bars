const express = require(`express`);
const router = express.Router();

module.exports = function (passport) {
    // Send user to twitter to login to their twitter acccount for authentication.
    router.get(`/twitter`, passport.authenticate(`twitter`));

    // Endpoint that twitter sends the user to after logigng in.
    router.get(`/twitter/callback`, passport.authenticate(`twitter`, {
        successRedirect: `/`,
        failureRedirect: `/`,
    }));
    return router;
};
