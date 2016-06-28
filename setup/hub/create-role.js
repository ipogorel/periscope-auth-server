var role = require('../roles.json');
var logProvider = require('../../utils/logger');


exports.run = function(hubclient, permissions, callback) {
    hubclient.get("roles","(key:" + role.key + ")" , function (err, response, data) {
        if (response.statusCode!=200)
            return callback(err, response, data);
        var q = "(key:jetbrains.jetpass.role-read or key:jetbrains.jetpass.service-read or key:jetbrins.jetpass.profile-readSelf)";
        hubclient.get("permissions",q, function (err, response, adminPermissions) {
            if (err)
                return callback(err, response, adminPermissions);
            for (var i=0;i<adminPermissions.permissions.length;i++){
                permissions.push(adminPermissions.permissions[i]);
            }
            if (data.total>0){ //update existing role
                data.roles[0].permissions = permissions
                hubclient.post("roles/"+ data.roles[0].id, data.roles[0], function (err, response, r) {
                    return callback(err, response, role);
                })
            }
            else { //create a new role
                role.permissions = permissions;
                hubclient.post("roles",role, function (err, response, r) {
                    return callback(err, response, r);
                });
            }
        })
    })
}
