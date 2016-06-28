
var path = require('path');
var serverBaseDir = path.normalize('./');
var appRoot = './';
var outputRoot = 'dist/';
var nodeStartupScript = 'app.js';
var exportSrvRoot = 'export/';
module.exports = {
  root: appRoot,
  source: appRoot + '**/*.js',
  output: outputRoot,
  exportSrv: exportSrvRoot,
  sourceMapRelativePath: '/src',
  doc:'./doc',
  nodeJsPort:5000,
  webServerPort : 4000,
  serverBaseDir : serverBaseDir,
  nodeStartUpScriptPath : path.join( serverBaseDir,  nodeStartupScript)
};

