var request = require('request');

var headers = { connection: 'keep-alive', 'Content-Type': 'application/json' };
var hubApiUrl = "";

exports.configure = function(baseUrl, adminUsername, adminPassword){
    var credentials = new Buffer(adminUsername + ":" + adminPassword).toString('base64');
    headers.Authorization = 'Basic '+ credentials;
    hubApiUrl = baseUrl;
}

exports.post = function(entity,data,callback){
    var url = hubApiUrl + "/" + entity;
    request({ url: url, method: 'POST', headers: headers, json: true, body:data}, function (err, response, createdItem) {
        return callback(err, response, createdItem);
    })
}


exports.get = function(entity,query,callback){
    var url = hubApiUrl + "/" + entity;
    if (query)
        url+='?query=' + query;
    request({ url: url, method: 'GET', headers: headers, json: true}, function (err, response, data) {
        return callback(err, response, data);
    })
}