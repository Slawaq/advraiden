'use strict';

const REDIRECT_PORT = 3000;

let runServers = require('./src/tool/servers-runner');
let loadFrom = require('./src/tool/json-loader');
let saver = require('./src/tool/json-saver');
let State = require('./src/state');

let state = new State(loadFrom('../../state/'), saver('../../state/'));

runServers([{
  port: REDIRECT_PORT,
  handler: '../handler/redirect/',
  state
}]);
