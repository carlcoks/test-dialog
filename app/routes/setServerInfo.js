const expressVer = require('express/package.json').version;
const vueServerVer = require('vue-server-renderer/package.json').version;

const serverInfo = `express/${expressVer} vue-server-renderer/${vueServerVer}`;

module.exports = (req, res, next) => {
  res.setHeader('Server', serverInfo);
  next();
};
