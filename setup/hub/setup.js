var createServices = require('./create-service-async');
var createPermissions = require('./create-permissions-async');
var createRoles = require('./create-role-async');
var createProjects = require('./create-project-async');
var createUsergroups = require('./create-usergroup-async');
var createUsergroupRoles = require('./create-usergroup-roles-async');
var createUsers = require('./create-users-async');

exports.run = function(hubClient) {
    return createServices.run(hubClient).then(function(services){
        return createPermissions.run(hubClient).then(function(permissions){
            return createRoles.run(hubClient).then(function(roles) {
                return createProjects.run(hubClient).then(function(roles) {
                    return createUsergroups.run(hubClient).then(function(groups) {
                        return createUsergroupRoles.run(hubClient).then(function(groupRoles) {
                            return createUsers.run(hubClient).then(function(users) {
                                return "done";
                            })
                        })
                    })
                })
            });
        })
    })
};

