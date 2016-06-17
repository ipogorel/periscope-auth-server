'use strict';

var express = require('express');
var controller = require('./permission.controller');
var authUtils = require('../../auth/authUtils');
var router = express.Router();
router.use(authUtils.ensureAuthenticated); //auth only appied for following paths, not the paths above
router.get('/', controller.index);
module.exports = router;
