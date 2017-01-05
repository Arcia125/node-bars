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
const Yelp = require(`./utils/yelp`);

const yelpApi = new Yelp({ clientId: config.yelp.c_key, clientSecret: config.yelp.c_secret });

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

const controllers = require(`./controllers`)(passport, yelpApi);
app.use(controllers);

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
