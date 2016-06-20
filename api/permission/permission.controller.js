/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /items              ->  index
 * POST    /items              ->  create
 * GET     /items/:id          ->  show
 * PUT     /items/:id          ->  update
 * DELETE  /items/:id          ->  destroy
 */

var hubUtils = require('../../utils/hubUtils');
var logProvider = require('../../utils/logger');
var User = require('../../auth/user.model.js');
var request = require('request');
var _ = require('lodash');
var config = require('../../config');

// Get list of user permissions
exports.index = function (req, res) {
    var logger = logProvider.logger();
    User.findById(req.user, function (err, user) {
        if (!user) {
            return res.status(404).send({message: 'User not found'});
        }

        logger.log('info',user.jetbrains);

        if (!user.jetbrains) // user is not a hub user
            return res.status(200).json([]);

        //var credentials = new Buffer(config.JETBRAINSHUB_CLIENTID + ":" + config.JETBRAINSHUB_SECRET).toString('base64');
        //var headers = { Authorization: 'Basic '+ credentials,  connection: 'keep-alive', 'Content-Type': 'application/json'  };
        //http://localhost:8080/hub/api/rest/permissions?query=(service:f12b9a21-6797-472b-b950-4b1deb832aa0 and role:d3b1281c-b730-4af3-a6d9-4ea9f59faf46)
        var headers = { Authorization: 'Bearer ' + user.jetbrainsToken, connection: 'keep-alive', 'Content-Type': 'application/json'  };

        request({ url: hubUtils.createHubUrl('/users/me'), method: 'GET', headers: headers, json: true},function (err, response, jbuser) {
            if (err)
                return res.status(500).send(err);


            if (!jbuser.projectRoles)
                return res.status(403).send({ message: 'User has no access to read roles' });

            var permissionsQuery = "service:" + config.JETBRAINSHUB_CLIENTID;
            var roles = [];
            for (var i=0;i<jbuser.projectRoles.length;i++){
                roles.push("role:" + jbuser.projectRoles[i].role.id)
            }
            permissionsQuery = "("+ permissionsQuery + " and (" + roles.join(" or ") + ")" + ")"
            request({ url: hubUtils.createHubUrl('/permissions?query=' + permissionsQuery), method: 'GET', headers: headers, json: true},function (err, response, data) {
                //logger.log('info',data.permissions);
                var result = _.map(data.permissions, function (p) {
                    return p.key;
                })
                return res.status(200).json(result);
            })
        })
    });
};