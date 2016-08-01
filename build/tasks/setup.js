var gulp = require('gulp');
var prompt = require('prompt');
var setupSequence = require('../../setup/hub/setup');
var hubClient = require('../../setup/hub/hub-client-async');
var config = require('../../config');

gulp.task('setup', function(done) {
    console.log('########### enter jetbrains hub admin username and password: ###########')
    hubClient.configure(config.JETBRAINSHUB_APIBASEURL, "admin", "admin123");
    setupSequence.run(hubClient).then(function(result){
        var a = result;
        done();
    });
});


