'use strict'

let serveStatic = require('serve-static')
let finalhandler = require('finalhandler')

let auth = require('./auth')
let api = require('./api')

let serve = serveStatic('src/client/output', {
  extensions: [ 'html', 'htm' ],
  index: [ 'index.html' ]
})

module.exports = state => { 
  api = api(state)
  return (req, res) => {
    let done = finalhandler(req, res)

    auth(req, res, done)
    req.url.startsWith('/api')
      ? api(req, res, done)
      : serve(req, res, done)
  }
}
