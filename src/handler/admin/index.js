'use strict';

let serveStatic = require('serve-static');
let finalhandler = require('finalhandler');

let serve = serveStatic('src/client/output', {
  extensions: ['html', 'htm'],
  index: ['index.html']
});

module.exports = state => (req, res) => {
  let done = finalhandler(req, res);
  serve(req, res, done);
};
