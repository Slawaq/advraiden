'use strict';

let go = require('./go');

module.exports = (req, res) => {
  console.log(req.url);
  if (req.url.startsWith('/go')) {
    go(req, res);
  }
};
