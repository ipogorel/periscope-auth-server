var service = require('../services.json');
var logProvider = require('../../utils/logger');

exports.run = function(hubclient, callback){
    var logger = logProvider.logger();
    hubclient.get("services","(key:" + service.key + ")" , function (err, response, data) {
        if (response.statusCode!=200)
            return callback(err, response, data);
        if (data.total>0){
            service.id = data.services[0].id;
            hubclient.post("services/" + service.id, service, function (err, response, createdService) {
                return callback(err, response, service);
            })
        }
        else {
            hubclient.post("services", service, function (err, response, createdService) {
                return callback(err, response, createdService);
            })
        }
    })

}
