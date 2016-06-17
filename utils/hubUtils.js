var url = require('url');
var config = require('../config');

exports.createHubUrl = function(apiMethodPath){
    //return url.resolve(config.hub.apiBaseUrl, apiMethodPath);
    return config.JETBRAINSHUB_APIBASEURL + apiMethodPath;
}


