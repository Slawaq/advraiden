'use strict';

const ADMIN_PORT = 8080;
const REDIRECT_PORT = 3000;

let runServers = require('./src/tool/servers-runner');
let loadFrom = require('./src/tool/json-loader');
let State = require('./src/state');

let state = new State(loadFrom('../../state/'));

let servers = [
  {
    port: ADMIN_PORT,
    handler: '../handler/admin/',
    state
  }, {
    port: REDIRECT_PORT,
    handler: '../handler/redirect/',
    state
  }
];

runServers(servers);
