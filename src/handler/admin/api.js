'use strict'

const Router = require('router')
const bodyParser = require('body-parser')
const finisher = require('../../tool/finisher')
const validUrl = require('valid-url')
const publicRedirect = require('../../../config.json').publicRedirect

let getAll = state => (req, res) => {
  let { campaignings } = state
  res.end(JSON.stringify({ campaignings, publicRedirect }))
}

let addCampaigning = state => (req, res, next) => {
  let { title } = req.body
  let id = state.generateNextId(state.campaignings) + 214

  let campaigning = { title, id, links: [] }

  state.campaignings.push(campaigning)
  res.write(JSON.stringify(campaigning))
  next()
}

let removeCampaigning = state => (req, res, next) => {
  let id = parseInt(req.params.id, 10)

  state.campaignings = state.campaignings.filter(x => x.id !== id)
  next()
}

let addLink = state => (req, res, next) => {
  let campaigningId = parseInt(req.params.id, 10)
  let to = addProtocol(req.body.to)

  let campaigning = state.campaignings.find(x => x.id === campaigningId)
  let id = state.generateNextId(campaigning.links) + 436
  let link = { id, to }

  campaigning.links.push(link)
  res.write(JSON.stringify(link))
  next()
}

let changeLink = state => (req, res, next) => {
  let campaigningId = parseInt(req.params.id, 10)
  let linkId = parseInt(req.params.linkId, 10)
  let to = addProtocol(req.body.to)

  let campaigning = state.campaignings.find(x => x.id === campaigningId)
  let link = campaigning.links.find(x => x.id === linkId)
  
  link.to = to

  res.write(JSON.stringify(null))
  next()
}

let removeLink = state => (req, res, next) => {
  let campaigningId = parseInt(req.params.id, 10)
  let linkId = parseInt(req.params.linkId, 10)

  let campaigning = state.campaignings.find(x => x.id === campaigningId)
  campaigning.links = campaigning.links.filter(x => x.id !== linkId)
  next()
}

let addProtocol = link => /^https?:\/\//i.test(link) ? link : 'http://' + link

let setupRouter = state => {
  let stateUpdater = (req, res, next) => { state.update(); next() }
  let router = new Router({ mergeParams: true })
  router.use(bodyParser.json())

  router.get('/api/all', getAll(state), finisher)
  router.post('/api/campaigning', addCampaigning(state), stateUpdater, finisher)
  router.delete('/api/campaigning/:id', removeCampaigning(state), stateUpdater, finisher)
  router.post('/api/campaigning/:id/link', addLink(state), stateUpdater, finisher)
  router.put('/api/campaigning/:id/link/:linkId', changeLink(state), stateUpdater, finisher)
  router.delete('/api/campaigning/:id/link/:linkId', removeLink(state), stateUpdater, finisher)

  return router
}

module.exports = setupRouter
