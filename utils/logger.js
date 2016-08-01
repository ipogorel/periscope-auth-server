var winston = require('winston');

var winstonLogger = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)(),
        new (winston.transports.File)({ filename: 'file.log' })
    ]
});
exports.logger = function(){
    return winstonLogger;
}
