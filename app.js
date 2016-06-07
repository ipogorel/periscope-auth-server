'use strict';


// Set default node environment to development


var express = require('express');
var mongoose = require('mongoose');
var compression = require('compression');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var path = require('path');
var config = require('./config');
// Connect to database


var connectionString = config.mongo.connectionstring;

console.log("connection string : " + connectionString);
mongoose.connect(connectionString);

// Setup server
var app = express();
var server = require('http').createServer(app);

//config express and routing
 /*var env = app.get('env');*/
app.use(compression());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(methodOverride());


var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'accept,authorization,content-type');
    next();
}
app.use(allowCrossDomain);


require('./routes')(app);


//var port = process.env.PORT;
var port = config.port;
var server = app.listen(port, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("host "  + host);
    console.log('Express Server listening at http://%s:%s in %s mode', host, port, app.get('env'))
});

// Expose app
exports = module.exports = app;