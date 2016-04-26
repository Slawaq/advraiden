'use strict';

const toFile = require('../../tool/toFile.js')('stats');
let htmlRedirect = require('./redirect');
let url = require('url');

let stats = [];

setInterval(() => {
  let toFlush = stats.slice(0);
  stats = [];
  toFile(toFlush);
}, 1000);

module.exports = (state, req, res) => {
  let params = url.parse(req.url, true);
  let ids = params.pathname.split('/go/')[1].split('/');

  let campaigningId = parseInt(ids[0], 10);
  let linkId = parseInt(ids[1], 10);
  let destination = state.redirects[campaigningId][linkId];
  
  res.statusCode = 200;
  res.write(htmlRedirect(destination, params.query.subid));

  stats.push(req.url);
};
