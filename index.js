'use strict'

const ADMIN_PORT = require('./config.json').ports.admin
const REDIRECT_PORT = require('./config.json').ports.redirect

let runServers = require('./src/tool/servers-runner')
let loadFrom = require('./src/tool/json-loader')
let saver = require('./src/tool/json-saver')
let State = require('./src/ApplicationState')

let state = new State(loadFrom('../../state/'), saver('../../state/'))

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
]

runServers(servers)
