
'use strict';

module.exports = function (app) {
    app.use('/api/permission', require('./api/permission'));
    app.use('/auth',require('./auth'));
};
