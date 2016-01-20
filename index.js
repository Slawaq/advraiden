'use strict';

let http = require('http');

const PORT = 3000;

let server = http.createServer(
  (request, response) => response.end('It Works!! Path Hit: ' + request.url));

server.listen(PORT, () => {
    console.log('Server listening on: http://localhost:', PORT);
});
