'use strict';

const config = require(`../config`);

const TwitterStrategy = require(`passport-twitter`).Strategy;

module.exports = function (passport, db) {
    passport.use(new TwitterStrategy({
        consumerKey: config.twitter.c_key,
        consumerSecret: config.twitter.c_secret,
        callbackURL: `${config.hostName}/auth/twitter/callback`,
    }, (token, tokenSecret, profile, done) => {
        process.nextTick(() => {
            const users = db.get().collection(`users`);
            users.findOne({ "twitterId": profile.id }, (err, user) => {
                if (err) {
                    return done(err);
                }
                if (user) {
                    return done(null, user);
                } else {
                    const newUser = {
                        "twitterId": profile.id,
                        "twitterToken": token,
                        "twitterUsername": profile.username,
                        "twitterDisplayName": profile.displayName,
                    };
                    users.findAndModify({
                        "twitterId": profile.id,
                    },
                    null, { $setOnInsert: newUser }, {
                        new: true,
                        fields: { twitterId: 1, twitterToken: 1, twitterUsername: 1, twitterDisplayName: 1, _id: 0 },
                        upsert: true,
                    }, (er, object) => {
                        if (er) {
                            console.log(err.message);
                            return done(err);
                        } else {
                            return done(null, newUser);
                        }
                    });
                }
            });
        });
    }));

    passport.serializeUser((user, done) => {
        done(null, user);
    });

    passport.deserializeUser((userObj, done) => {
        const users = db.get().collection(`users`);
        users.findOne({ "twitterId": userObj.twitterId }, (err, user) => {
            done(err, user);
        });
    });
};
