'use strict'

const { scheme, domain, path, combine } = require('../../config.json').redirect

module.exports = campaigningId => id => {
  let ids = combine
    .replace('{0}', campaigningId)
    .replace('{1}', id)

  return `${scheme}://${domain}/${path}${ids}`
}
