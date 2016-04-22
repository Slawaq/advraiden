'use strict';

const path = require('path');
const fs = require('fs');

module.exports = base => name => json => {
  let jsonPath = path.join(__dirname, base, name.endsWith('.json') ? name : name + '.json');
  let file = fs.openSync(jsonPath, 'w+')
  fs.writeSync(file, JSON.stringify(json, null, 2), "UTF-8",{'flags': 'w+'});
  fs.closeSync(file);
};
