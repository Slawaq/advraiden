'use strict';

let htmlRedirect = require('./redirect');
let url = require('url');

module.exports = (state, req, res) => {
  let params = url.parse(req.url, true);
  let ids = params.pathname.split('/go/')[1].split('/');

  let campaigningId = parseInt(ids[0], 10);
  let linkId = parseInt(ids[1], 10);
  let destination = state.redirects[campaigningId][linkId];
  
  res.statusCode = 200;
  res.write(htmlRedirect(destination, params.query.subid));
};
