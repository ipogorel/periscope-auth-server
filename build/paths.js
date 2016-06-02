
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

/*

 var path = require('path');
 var serverBaseDir = path.normalize('./../server');
 var appRoot = 'src/';
 var outputRoot = 'dist/';
 var nodeStartupScript = 'app.js';
 var exportSrvRoot = 'export/';
 module.exports = {
 root: appRoot,
    output: outputRoot,
    exportSrv: exportSrvRoot,
    sourceMapRelativePath: '/src',
    doc:'./doc',
    e2eSpecsSrc: 'test/e2e/src/*.js',
    e2eSpecsDist: 'test/e2e/dist/',
    nodeJsPort:5000,
    webServerPort : 4000,
    serverBaseDir : serverBaseDir,
    nodeStartUpScriptPath : path.join( serverBaseDir,  nodeStartupScript)
};

*/