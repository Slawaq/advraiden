'use strict'

const { path, logs } = require('../../../config.json').redirect
const logger = require('winston')
require('winston-elasticsearch')

logger
  .add(logger.transports.Elasticsearch, { level: 'info', indexPrefix: logs.indexPrefix, clientOpts: { host: logs.logsElasticUrl, httpAuth: logs.httpAuth } })
  .add(logger.transports.Console, { level: 'error' })

const go = require('./go')
const welcome = require('./welcome')

module.exports = state => {
  setInterval(() => state.load(), 1000)

  return (req, res) => {
    try {
      if (req.url.startsWith('/' + path))
        go(state, logger, req, res)
      else
        welcome(state, req, res)
      res.end()
    } catch (err) {
      res.statusCode = 400
      res.end()
      logger.error('Error', { name: err.name, stack: err.stack })
    }
  }
}
