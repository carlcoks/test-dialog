const path = require('path');
const { createBundleRenderer } = require('vue-server-renderer');
const createCacheComponents = require('./createCacheComponents');

const resolve = file => path.resolve(__dirname, '..', '..', file);

module.exports = function createRenderer(bundle, options) {
  return createBundleRenderer(bundle, Object.assign(options, {
    // cache: createCacheComponents(),
    basedir: resolve('./dist'),
    runInNewContext: false,
  }));
};
