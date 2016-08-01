var newData = require('../users.json');
var Q = require('q');
var _ = require('lodash');
var logProvider = require('../../utils/logger');

exports.run = function(hubclient) {
    var entityName = "users";
    return hubclient.getAll("usergroups").then(function (existingGroups) {
        return hubclient.getAll(entityName).then(function (existingUsers) {
            var all = [];
            for (var i=0; i<newData.length;i++){
                var eU = _.find(existingUsers,{"login":newData[i].login});
                if (!eU){
                    for (var j=0; j<newData[i].groups.length;j++){
                        var eG = _.find(existingGroups,{"name":newData[i].groups[j].name});
                        if (!eG)
                            throw "usergroup with the name " + newData[i].groups[j].name + " does not exist";
                        newData[i].groups[j]=eG;
                    }
                    all.push(hubclient.post(entityName, newData[i]).then(function(u){
                        return u;
                    }));
                }

            }
            return Q.all(all);
        })
    })
}

