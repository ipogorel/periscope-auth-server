var newData = require('../user-groups-roles.json');
var Q = require('q');
var _ = require('lodash');
var logProvider = require('../../utils/logger');


exports.run = function(hubclient) {
    return hubclient.getAll("roles").then(function (existingRoles) {
        return hubclient.getAll("usergroups").then(function (existingUsergroups) {
            return hubclient.getAll("projects").then(function (existingProjects) {
                for (var i = 0; i < newData.length; i++) {
                    var uG = _.find(existingUsergroups, {"name": newData[i].name});
                    if (!uG)
                        throw "usergroup with the name " + newData[i].role.name + " does not exist";

                    var uP = _.find(existingProjects, {"name": newData[i].project.key});
                    if (!uP)
                        throw "project with the key " + newData[i].project.key + " does not exist";

                    var uR = _.find(existingRoles, {"key": newData[i].role.key});
                    if (!uR)
                        throw "role with the key " + newData[i].role.key + " does not exist";

                    newData[i].project = uP;
                    newData[i].role = uR;
                    return hubclient.post("usergroups/" + uG.id + "/projectroles", newData[i]).then(function (newRole) {
                        return newRole;
                    })
                }
            })
        })
    })

}
