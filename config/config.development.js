var config = require('./config.global');

config.env = "development";
config.defaultRole = "member";
config.port = 5000;
config.mongo = {};
config.mongo.connectionstring = 'mongodb://localhost/' + 'aureliauth-production';
config.TOKEN_SECRET = process.env.TOKEN_SECRET || '237jsdhusayhD';
config.IDENTSRV_SECRET = process.env.IDENTSRV_SECRET || '1gSsg0Clmm3s';
config.MONGO_URI = process.env.MONGO_URI || 'localhost';
config.FACEBOOK_SECRET = process.env.FACEBOOK_SECRET || '617e37e812b9c47279370d3b29815a60';
config.FOURSQUARE_SECRET = process.env.FOURSQUARE_SECRET || 'Foursquare Client Secret';
config.GOOGLE_SECRET = process.env.GOOGLE_SECRET || 'Google Client Secret';
config.GITHUB_SECRET = process.env.GITHUB_SECRET || '1bac8fcb2e6f82a8f9a1b96dccefd36222b31739';
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
