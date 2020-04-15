const webpack = require('webpack');
const merge = require('webpack-merge');
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const base = require('./webpack.base.config');
const config = require('../config');

const webpackConfig = merge(base, {
  entry: {
    app: './src/entry-client.js',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.env,
      'process.env.VUE_ENV': '"client"',
    }),
    // extract vendor chunks for better caching
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks(module) {
        // a module is extracted into the vendor chunk if...
        return (
          // it's inside node_modules
          /node_modules/.test(module.context) &&
          // and not a CSS file (due to extract-text-webpack-plugin limitation)
          !/\.css$/.test(module.request)
        );
      },
    }),
    // extract webpack runtime & manifest to avoid vendor chunk hash changing
    // on every build.
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      minChunks: Infinity
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'app',
      async: 'vendor-async',
      children: true,
      minChunks: 3
    }),
    new VueSSRClientPlugin(),
  ],
});

module.exports = webpackConfig;
