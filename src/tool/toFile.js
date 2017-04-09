'use strict'

const Promise = require('bluebird')
const fs = Promise.promisifyAll(require('fs'))

module.exports = filename => async array => {
  let file = await fs.openAsync(filename, 'a')
  await fs.writeAsync(file, array.map(x => `${x}\r\n`), 'utf8')
  await fs.closeAsync(file)
}
