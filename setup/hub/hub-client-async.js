var request = require('request-promise');

var headers = { connection: 'keep-alive', 'Content-Type': 'application/json' };
var hubApiUrl = "";

exports.configure = function(baseUrl, adminUsername, adminPassword){
    var credentials = new Buffer(adminUsername + ":" + adminPassword).toString('base64');
    headers.Authorization = 'Basic '+ credentials;
    hubApiUrl = baseUrl;
}

exports.post = function(entity,data){
    var url = hubApiUrl + "/" + entity;
    return request({ url: url, method: 'POST', headers: headers, json: true, body:data}).then(function (result) { return result;});
}


exports.get = function(entity,query){
    var url = hubApiUrl + "/" + entity;
    if (query)
        url+='?query=' + query;
    return request({ url: url, method: 'GET', headers: headers, json: true}).then(function (result) { return result;});
}

exports.getAll = function(entity){
    var url = hubApiUrl + "/" + entity;
    return request({ url: url, method: 'GET', headers: headers, json: true}).then(function (result) {
        if (result.total>0)
            return result[entity];
        return [];
    });
}