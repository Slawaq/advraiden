'use strict';

const path = require('path');

module.exports = base => name => {
  let jsonPath = path.join(__dirname, base, name.endsWith('.json') ? name : name + '.json');
  delete require.cache[jsonPath];
  return require(jsonPath);
};
