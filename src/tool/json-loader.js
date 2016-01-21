'use strict';

module.exports = base => name => {
  let path = base + name;
  delete require.cache[path];
  return require(path);
};
