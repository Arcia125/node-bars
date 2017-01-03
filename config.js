'use strict';


const config = {};
config.port = process.env.PORT || 5000;

config.isDev = !(process.env.NODE_ENV === `production`);
config.isTest = process.env.NODE_ENV === `test`;

// If the NODE_ENV is 'test' this should require in the testenv.js file as the environment
const env = config.isTest ? require(`./testenv`) : process.env;

config.hostName = config.isDev ? `http://localhost:${config.port}` : `https://node-bars.herokuapp.com`;
config.session_secret = env.SESSION_SECRET;

// Database configuration object
config.db = {};
config.db.host = env.DBHOST;
config.db.user = env.DBUSER;
config.db.pw = env.DBPW;
config.db.port = env.DBPORT;
config.db.name = env.DBNAME;
config.db.url = `mongodb://${config.db.user}:${config.db.pw}@${config.db.host}:${config.db.port}/${config.db.name}`;

// Twitter API configuration object
config.twitter = {};
config.twitter.c_key = env.TWITTER_CONSUMER_KEY;
config.twitter.c_secret = env.TWITTER_CONSUMER_SECRET;

// Yelp API configuration object
config.yelp = {};
config.yelp.c_key = env.YELP_CONSUMER_KEY;
config.yelp.c_secret = env.YELP_CONSUMER_SECRET;

module.exports = config;
