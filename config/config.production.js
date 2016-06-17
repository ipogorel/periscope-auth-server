var config = require('./config.global');

config.env = "production";
config.defaultRole = "member";
config.port = 10000;
config.mongo = {};
config.mongo.connectionstring = 'mongodb://localhost/' + 'aureliauth-production';
config.TOKEN_SECRET = process.env.TOKEN_SECRET || 'A hard to guess string';
config.MONGO_URI = process.env.MONGO_URI || 'localhost';
config.FACEBOOK_SECRET = process.env.FACEBOOK_SECRET || 'Facebook Client Secret';
config.FOURSQUARE_SECRET = process.env.FOURSQUARE_SECRET || 'Foursquare Client Secret';
config.GOOGLE_SECRET = process.env.GOOGLE_SECRET || 'Google Client Secret';
config.GITHUB_SECRET = process.env.GITHUB_SECRET || 'GitHub Client Secret';
config.LINKEDIN_SECRET = process.env.LINKEDIN_SECRET || 'LinkedIn Client Secret';
config.WINDOWS_LIVE_SECRET = process.env.WINDOWS_LIVE_SECRET || 'Windows Live Secret';
config.TWITTER_KEY = process.env.TWITTER_KEY || 'Twitter Consumer Key';
config.TWITTER_SECRET = process.env.TWITTER_SECRET || 'Twitter Consumer Secret';
config.TWITTER_CALLBACK = process.env.TWITTER_CALLBACK || 'Twitter Callback URL';
config.YAHOO_SECRET = process.env.YAHOO_SECRET || 'Yahoo Client Secret';

config.JETBRAINSHUB_CLIENTID = process.env.JETBRAINSHUB_CLIENTID || 'f12b9a21-6797-472b-b950-4b1deb832aa0';
config.JETBRAINSHUB_SECRET = process.env.JETBRAINSHUB_SECRET || '1gSsg0Clmm3s';
config.JETBRAINSHUB_APIBASEURL= "http://localhost:8080/hub/api/rest";
config.JETBRAINSHUB_SERVICEID= "f12b9a21-6797-472b-b950-4b1deb832aa0";

module.exports = config;

