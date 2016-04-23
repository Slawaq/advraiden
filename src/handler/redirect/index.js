'use strict';

let go = require('./go');

module.exports = state => (req, res) => {
  try {
    if (req.url.startsWith('/go')) {
      go(state, req, res);
    }
    res.end();
  } catch (err) {
    res.statusCode = 400;
    res.end();
  }
};
