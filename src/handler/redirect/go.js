'use strict'

const toFile = require('../../tool/toFile.js')('stats')
const htmlRedirect = require('./redirect')
const url = require('url')
const macros = require('../../../config.json').macros

let stats = []

setInterval(() => {
  let toFlush = stats.slice(0)
  stats = []
  toFile(toFlush)
}, 1000)

module.exports = (state, req, res) => {
  let params = url.parse(req.url, true)
  let ids = params.pathname.split('/go/')[1].split('/')

  let campaigningId = parseInt(ids[0], 10)
  let linkId = parseInt(ids[1], 10)
  let destination = getDestinationUri(state.redirects[campaigningId][linkId])(params.query.subid || '')

  res.statusCode = 200
  res.write(htmlRedirect(destination))

  //stats.push(req.url)
}

let getDestinationUri = destination => subid => {
  let macrosPosition = destination.indexOf(macros)

  if (macrosPosition !== -1) {
    let left = destination.substring(0, macrosPosition)
    let right = destination.substring(macrosPosition + macros.length)
    return left + subid + right
  }

  return destination + (destination.indexOf('?') === -1 ? '?' : '&') + 'id=' + subid
}
