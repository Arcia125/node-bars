'use strict';

const config = {***REMOVED***
config.port = process.env.PORT;
config.isDev = !!process.env.DEV;
config.hostName = config.isDev ? `http://localhost:${config.port}` : `https://nodejs-polls.herokuapp.com`;

config.db = {***REMOVED***
config.db.host = process.env.DBHOST;
config.db.user = process.env.DBUSER;
config.db.pw = process.env.DBPW;
config.db.port = process.env.DBPORT;
config.db.name = process.env.DBNAME;
config.db.url = `mongodb://${config.db.user}:${config.db.pw}@${config.db.host}:${config.db.port}/${config.db.name}`;

config.twitter = {***REMOVED***
config.twitter.c_key = process.env.TWITTER_CONSUMER_KEY;
config.twitter.c_secret = process.env.TWITTER_CONSUMER_SECRET;

module.exports = config;