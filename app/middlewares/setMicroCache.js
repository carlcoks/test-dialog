const microcache = require('route-cache');

module.exports = seconds => {
  return microcache.cacheSeconds(seconds, req => {
    return !req.session.auth && req.originalUrl;
  });
};
