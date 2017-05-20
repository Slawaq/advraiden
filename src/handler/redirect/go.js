'use strict'

const UAParser = require('ua-parser-js')

const geoip = require('geoip-lite')

const htmlRedirect = require('./redirect')
const url = require('url')
const { macros } = require('../../../config.json')
const { path, combine, reversed } = require('../../../config.json').redirect

const combineTemplate = `^${combine.replace('{0}', '(\\d+)').replace('{1}', '(\\d+)')}.*`
const idsExtractRegExp = new RegExp(combineTemplate)

module.exports = (state, logger, req, res) => {
  let params = url.parse(req.url, true)
  
  let idsWithParams = params.path.split('/' + path)[1]
  let extracted = idsExtractRegExp.exec(idsWithParams) || []

  let campaigningId = parseInt(extracted[reversed ? 2 : 1], 10)
  let linkId = parseInt(extracted[reversed ? 1 : 2], 10)
  let destination = getDestinationUri(state.redirects[campaigningId][linkId])(params.query.subid || '')

  res.statusCode = 200
  res.write(htmlRedirect(destination))

  let parser = new UAParser()

  logger.info('redirect', { 
    campaigningId, 
    campaigningTitle: state.redirects[campaigningId].title, 
    linkId,
    link: state.redirects[campaigningId][linkId],
    subid: params.query.subid,
    adress: req.socket.address(),
    headers: req.headers,
    geoip: geoip.lookup(getIp(req)),
    userAgent: parser.setUA(req.headers['user-agent']).getResult()
  })
}

let getIp = req => req.headers['x-forwarded-for'] || 
     req.connection.remoteAddress || 
     req.socket.remoteAddress ||
     req.connection.socket.remoteAddress;

let getDestinationUri = destination => subid => {
  let macrosPosition = destination.indexOf(macros)

  if (macrosPosition !== -1) {
    let left = destination.substring(0, macrosPosition)
    let right = destination.substring(macrosPosition + macros.length)
    return left + subid + right
  }

  return destination + (destination.indexOf('?') === -1 ? '?' : '&') + 'id=' + subid
}
