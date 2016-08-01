var newData = require('../user-groups.json');
var Q = require('q');
var _ = require('lodash');
var logProvider = require('../../utils/logger');


exports.run = function(hubclient) {
    var entityName = "usergroups";
    return hubclient.getAll("projects").then(function (existingProjects) {
        return hubclient.getAll(entityName).then(function (existingData) {
            var all = [];
            for (var i = 0; i < newData.length; i++) {
                var uG = _.find(existingData, {"name": newData[i].name});
                if (!uG) {
                    // find project
                    var eP = _.find(existingProjects, {"key": newData[i].project.key});
                    if (!eP)
                        throw "service with the key " + newData[i].project.key + " does not exist";
                    newData[i].project = eP;
                    // create new group
                    all.push(hubclient.post(entityName, newData[i]).then(function (newGroup) {
                        return newGroup;
                    }));
                }
            }
            return Q.all(all);
        })
    })
}


