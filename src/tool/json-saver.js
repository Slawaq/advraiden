'use strict'

const Promise = require('bluebird')
const path = require('path')
const fs = Promise.promisifyAll(require('fs'))

module.exports = base => name => async json => {
  let jsonPath = path.join(__dirname, base, name.endsWith('.json') ? name : name + '.json')
  let file = await fs.openAsync(jsonPath, 'w+')
  await fs.writeAsync(file, JSON.stringify(json, null, 2), 'utf8', { flags: 'w+' })
  await fs.closeAsync(file)
}
