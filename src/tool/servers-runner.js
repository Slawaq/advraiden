'use strict'

let http = require('http')

module.exports = servers => servers
  .map(cfg => ({
    port: cfg.port,
    handler: require(cfg.handler)(cfg.state)
  }))
  .forEach(cfg => {
    let server = http.createServer((req, res) => {
      cfg.handler(req, res)
    })
    server.listen(cfg.port)
  })
