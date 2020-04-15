const LRU = require('lru-cache');

module.exports = () => LRU({
  max: 1000,
  maxAge: 1000,
});
