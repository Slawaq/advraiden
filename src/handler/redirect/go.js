'use strict';

let linker = require('./linker.js');

module.exports = (state, req, res) => {
  let id = req.url.slice(4, 10);

  if (id.length > 0) {
    res.statusCode = 302;
    res.setHeader('Location', linker(id) || 'http://google.com');
  }
};
