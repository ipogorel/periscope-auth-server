var Q = require('q');
var _ = require('lodash');
var services = require('../services.json');
var logProvider = require('../../utils/logger');

exports.run = function(hubclient){
    var entityName = "services";
    var logger = logProvider.logger();
    return hubclient.getAll(entityName).then(function(result){
        var all = [];
        for (var i=0; i<services.length;i++){
            if (!_.find(result,{"key":services[i].key})){
                all.push(hubclient.post(entityName, services[i]).then(function(s){
                    return s;
                }));
            }
        }
        return Q.all(all);
    });
}


