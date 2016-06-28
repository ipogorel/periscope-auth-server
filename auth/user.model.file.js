var config = require('../config');
var jsonfile = require('jsonfile');
var _ = require('lodash');
var guid = require('../utils/guid')
var bcrypt = require('bcryptjs');

var file = './data/users.json';


var userSchema = {
    _id: "",
    email: "",
    password: "",
    role: config.defaultRole,
    displayName: "",
    picture: "",
    facebook: "",
    foursquare: "",
    google: "",
    github: "",
    linkedin: "",
    live: "",
    yahoo: "",
    twitter: "",
    jetbrains: "",
    jetbrainsToken: ""
};



var model = (function(){
    var constructor = function (schema) {
        if (schema) {
            var self = this;
            _.forOwn(schema, function (value, key) {
                self[key] = value;
            })
        }
        this.save = function(callback){
            if (!this._id)
                this._id = guid.createGuid();
            var jsonData = jsonfile.readFileSync(file);
            var usr = _.find(jsonData,{"_id":this._id});
            var isNew = false;
            if (!usr){
                usr = {};
                isNew = true;
            }
            var self = this;
            _.forOwn(userSchema, function (value, key) {
                if (self[key])
                    usr[key] = self[key];
            })
            if (isNew)
                jsonData.push(usr);
            jsonfile.writeFileSync(file, jsonData);
            if (callback)
                callback();
        };

        this.comparePassword = function(password, done) {
            bcrypt.compare(password, this.password, function(err, isMatch) {
                done(err, isMatch);
            });
        };
    };

    //Entity.findOne({email: req.body.email}, '+password', function (err, user)
    constructor.findOne = function(searchExpression, callback) {

        var jsonData = jsonfile.readFileSync(file);
        var uData = _.find(jsonData,searchExpression);
        if (uData)
            return callback(undefined, new this(uData));
        else
            return callback(undefined, undefined);
    };

    constructor.findById = function(id, callback) {
        var jsonData = jsonfile.readFileSync(file);
        var uData = _.find(jsonData,{"_id":id});
        if (uData)
            return callback(undefined, new this(uData));
        else
            return callback(undefined, undefined);
    };

    return constructor
})







//module.exports = mongoose.model('User', schema);
module.exports = model();
