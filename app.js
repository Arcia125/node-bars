'use strict';

const express = require(`express`);
const app = express();
const request = require(`request`);

const passport = require(`passport`);
const flash = require(`connect-flash`);

const expressStatic = require(`express-static`);
const cookieParser = require(`cookie-parser`);
const bodyParser = require(`body-parser`);
const session = require(`express-session`);

const config = require(`./config`);
const db = require(`./db`);

require(`./middlewares/pass`)(passport, db);

app.set(`view engine`, `ejs`);

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(expressStatic(`${__dirname}/public`));
app.use(session({ secret: config.session_secret, resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use(require(`./controllers`));

// app.get(`/auth/twitter`, passport.authenticate(`twitter`));

// app.get(`/auth/twitter/callback`,
//     passport.authenticate(`twitter`, {
//         successRedirect: `/`,
//         failureRedirect: `/`,
//     }));

db.connect(config.db.url, (err) => {
    if (err) {
        throw err;
    } else {
        app.listen(config.port, () => {
            console.log(`App listening on port:${config.port}`);
        });
    }
});

module.exports = app;
