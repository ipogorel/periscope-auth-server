'use strict';
var config = require('../config');
var bcrypt = require('bcryptjs');
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

//unique: true,
var schema = new Schema({
    email: { type: String, lowercase: true },
    password: { type: String, select: false },
    role: {type: String, default:config.defaultRole},
    displayName: String,
    picture: String,
    facebook: String,
    foursquare: String,
    google: String,
    github: String,
    linkedin: String,
    live: String,
    yahoo: String,
    twitter: String,
    jetbrains: String,
    jetbrainsToken: String

});
schema.pre('save', function(next) {
    var user = this;
    if (!user.isModified('password')) {
        return next();
    }
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(user.password, salt, function(err, hash) {
            user.password = hash;
            next();
        });
    });
});

schema.methods.comparePassword = function(password, done) {
    bcrypt.compare(password, this.password, function(err, isMatch) {
        done(err, isMatch);
    });
};

module.exports = mongoose.model('User', schema);
