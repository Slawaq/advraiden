'use strict';

let go = require('./go');

module.exports = state => (req, res) => {
  if (req.url.startsWith('/go')) {
    go(state, req, res);
  }
  res.end();
};
