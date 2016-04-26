'use strict';

const path = require('path');
const fs = require('fs');

module.exports = filename => array => {
  let file = fs.openSync(filename, 'a');
  fs.writeSync(file, array.map(x => `${x}\r\n`), "UTF-8");
  fs.closeSync(file);
}