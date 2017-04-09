'use strict'

const Promise = require('bluebird')
const path = require('path')
const fs = Promise.promisifyAll(require('fs'))

module.exports = base => async name => {
  let jsonPath = path.join(__dirname, base, name.endsWith('.json') ? name : name + '.json')
  let data = await fs.readFileAsync(jsonPath, 'utf8')

  return JSON.parse(data)
}
