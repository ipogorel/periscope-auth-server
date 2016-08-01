var gulp = require('gulp');
var prompt = require('prompt');
var setupSequence = require('../../setup/hub/setup');
var hubClient = require('../../setup/hub/hub-client-async');
var config = require('../../config');

gulp.task('setup', function(done) {
    console.log('########### enter jetbrains hub admin username and password: ###########')
    prompt.get(['username', 'password'], function (err, result) {
        hubClient.configure(config.JETBRAINSHUB_APIBASEURL, result.username, result.password);
        setupSequence.run(hubClient).then(function () {
            console.log("setup completed successfully");
            done();
        })
    });
});





