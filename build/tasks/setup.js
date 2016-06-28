var gulp = require('gulp');
var prompt = require('prompt');
var paths = require('../paths');
var setupSequence = require('../../setup/hub/sequense');
var hubClient = require('../../setup/hub/hub-client');
var config = require('../../config');

gulp.task('setup', function(done) {
    console.log('########### enter jetbrains hub admin username and password: ###########')
    prompt.get(['username', 'password'], function (err, result) {
        hubClient.configure(config.JETBRAINSHUB_APIBASEURL, result.username, result.password);
        setupSequence.run(hubClient, function (err, response, createdItem) {
            if (response.statusCode!=200) {
                console.log("error occured:");
                console.log(response.body);
            }
            else
                console.log("setup completed successfully");
            done();
        });
    });
});


