var projects = require('../projects.json');
var Q = require('q');
var _ = require('lodash');
var logProvider = require('../../utils/logger');


exports.run = function(hubclient) {
    var entityName = "projects";
    return hubclient.getAll(entityName).then(function(existingProjects){
        var all = [];
        for (var i=0; i<projects.length;i++){
            var ePr = _.find(existingProjects,{"key":projects[i].key});
            if (!ePr){
                all.push(hubclient.post(entityName, projects[i]).then(function(s){
                    return s;
                }));
            }
        }
        return Q.all(all);
    });
}

