var Q = require('q');
var _ = require('lodash');
var newData = require('../permissions.json');

exports.run = function(hubclient) {
    var entityName = "permissions";
    return hubclient.getAll("services").then(function(existingServices){
        return hubclient.getAll(entityName).then(function(existingData){
            var all = [];
            for (var i=0; i< newData.length;i++){
                var ePr = _.find(existingData,{"key":newData[i].key});
                if (!ePr){
                    var eS = _.find(existingServices,{"key":newData[i].service.key});
                    if (!eS)
                        throw "service with key " + newData[i].service.key + " not exists";
                    newData[i].service = eS;
                    all.push(hubclient.post(entityName, newData[i]).then(function(s){
                        return s;
                    }));
                }
            }
            return Q.all(all);
        });
    });
}


