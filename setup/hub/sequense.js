var createService = require('./create-service');
var createRole = require('./create-role');
exports.run = function(hubClient, callback) {
    createService.run(hubClient, function (err, response, createdService){
        var permissions = [];
        if (response.statusCode!=200)
            return callback(err, response, createdService);
        for (var i=0;i<createdService.permissions.length;i++){
            permissions.push(createdService.permissions[i]);
        }
        createRole.run(hubClient, permissions,function (err, response, createdRole){
            return callback(err, response, createdRole);
        })
    })
};
