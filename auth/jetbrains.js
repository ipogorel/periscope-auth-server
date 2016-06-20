'use strict';
var User = require('./user.model.js');
var config = require('../config');
var request = require('request');
var jwt = require('jwt-simple');
var authUtils = require('./authUtils');
var logProvider = require('../utils/logger');
var hubUtils = require('../utils/hubUtils');


exports.authenticate = function (req, res) {
    var accessTokenUrl = hubUtils.createHubUrl('/oauth2/token');
    var peopleApiUrl = hubUtils.createHubUrl('/users/me');

    var logger = logProvider.logger();
    var params = {
        code: req.body.code,
        client_id: req.body.clientId,
        client_secret: config.JETBRAINSHUB_SECRET,
        redirect_uri: req.body.redirectUri,
        grant_type: 'authorization_code'
    };
    var credentials = new Buffer(req.body.clientId + ":" + config.JETBRAINSHUB_SECRET).toString('base64');
    var authHeader= { Authorization: 'Basic '+ credentials, connection: 'keep-alive'  };



    // Step 1. Exchange authorization code for access token.

    request.post(accessTokenUrl, { json: true, form: params,headers:authHeader }, function (err, response, token) {
        logger.log("info",token);
        var accessToken = token.access_token;
        var expiresInSeconds = token.expires_in;
        var headers = { Authorization: 'Bearer ' + accessToken, connection: 'keep-alive', 'Content-Type': 'application/json'  };
        
        // Step 2. Retrieve profile information about the current user.
        if (err)
            logger.log('error', err);

        request({ url: peopleApiUrl, method: 'GET', headers: headers, json: true},
            function (err, response, profile) {
                if (err) {
                    console.log("error : " + err);
                }
                if (req.headers.authorization) {
                    User.findOne({ "jetbrains": profile.id }, function (err, existingUser) {
                        if (existingUser) {
                            return res.status(409).send({ message: 'There is already a Hub account that belongs to you' });
                        }
                        var token = req.headers.authorization.split(' ')[1];
                        var payload = jwt.decode(token, config.TOKEN_SECRET);
                        User.findById(payload.id, function (err, user) {
                            if (!user) {
                                return res.status(400).send({ message: 'User not found' });
                            }
                            user.jetbrains = profile.id;
                            user.jetbrainsToken = accessToken;
                            user.displayName = user.displayName || profile.name;
                            user.save(function () {
                                var token = authUtils.createJWT(user, expiresInSeconds);
                                res.send({ token: token });
                            });
                        });
                    });
                } else {
                    // Step 3b. Create a new user account or return an existing one.
                    User.findOne({ jetbrains: profile.id }, function (err, existingUser) {
                        if (existingUser) {
                            existingUser.jetbrainsToken = accessToken;
                            existingUser.save();
                            return res.send({ token: authUtils.createJWT(existingUser, expiresInSeconds) });
                        }
                        var user = new User();
                        user.jetbrains = profile.id;
                        user.jetbrainsToken = accessToken;
                        user.displayName = profile.name;
                        user.save(function (err) {
                            var token = authUtils.createJWT(user, expiresInSeconds);
                            res.send({ token: token });
                        });
                    });
                }
            });
    });
}