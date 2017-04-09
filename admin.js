'use strict'

const ADMIN_PORT = require('./config.json').ports.admin

let runServers = require('./src/tool/servers-runner')
let loadFrom = require('./src/tool/json-loader')
let saver = require('./src/tool/json-saver')
let State = require('./src/ApplicationState')

let state = new State(loadFrom('../../state/'), saver('../../state/'))

runServers([ {
  port: ADMIN_PORT,
  handler: '../handler/admin/',
  state
} ])
