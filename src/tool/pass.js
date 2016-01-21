'use strict';

module.exports = (...args) => func => (f => f(...args))(func);
