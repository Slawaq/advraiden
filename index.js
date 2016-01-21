'use strict';

let http = require('http');
let handlers = require('./handlers');

const PORT = 3000;

let server = http.createServer(
  (request, response) => {
    handlers(request, response);
    response.end();
  }
);

server.listen(PORT, () => { });
