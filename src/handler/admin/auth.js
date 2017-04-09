'use strict'

const logins = require('../../../config.json').logins

const auth = require('basic-auth')

module.exports = (req, res, done) => {
  let credentials = auth(req)

  if (!credentials || !logins.find(x => x.login === credentials.name && x.pass === credentials.pass)) {
    res.statusCode = 401
    res.setHeader('WWW-Authenticate', 'Basic realm="all-access"')
    res.end('<center>401 | Access denied</center>')
    done()
  }
}
