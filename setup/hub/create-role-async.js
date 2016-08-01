var newData = require('../roles.json');
var Q = require('q');
var _ = require('lodash');
var logProvider = require('../../utils/logger');


exports.run = function(hubclient, permissions) {
    var entityName = "roles";
    return hubclient.getAll("permissions").then(function(existingPermissions){
        return hubclient.getAll(entityName).then(function(existingData){
            var all = [];
            for (var i=0; i< newData.length;i++){
                var eRole = _.find(existingData,{"key":newData[i].key});
                if (!eRole){
                    // check and replace role permissions
                    for (var j=0; j< newData[i].permissions.length;j++) {
                        var eP = _.find(existingPermissions,{"key":newData[i].permissions[j].key});
                        if (!eP)
                            throw "permission with the key " + newData[i].permissions[j].key + " not exists";
                        newData[i].permissions[j] = eP;
                    }
                    all.push(hubclient.post(entityName, newData[i]).then(function(s){
                        return s;
                    }));
                }
            }
            return Q.all(all);
        });
    });
}

