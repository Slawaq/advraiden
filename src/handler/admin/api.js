'use strict';

const Router = require('router');
const textBody = require('body');
const jsonBody = require('body/json');

let state = null; // runtime setup
let router = new Router();

router.get('/api/all', (req, res) => {
  res.end(JSON.stringify({ campaignings: state.campaignings }));
});

router.post('/api/campaigning', (req, res, done) => {
  jsonBody(req, res, (err, body) => {
    if (err) {
            res.statusCode = 500
            return res.end("Error");
        }
 
        res.statusCode = 201;
        res.end();
        done();
  });
});

module.exports = appState => { 
  state = appState;
  return (req, res, done) => router(req, res, done)
}
