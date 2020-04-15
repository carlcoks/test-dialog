'use strict'
const utils = require('./utils')
const config = require('../config')
const isProduction = process.env.NODE_ENV === 'production'
const sourceMapEnabled = isProduction
  ? '#source-map'
  : '#cheap-module-source-map'

module.exports = {
  loaders: utils.cssLoaders({
    // sourceMap: sourceMapEnabled,
    extract: isProduction
  }),
  // extractCSS: process.env.NODE_ENV === 'production',
  preserveWhitespace: false,
  cssSourceMap: sourceMapEnabled,
  // cacheBusting: config.dev.cacheBusting,
  transformToRequire: {
    video: ['src', 'poster'],
    source: 'src',
    img: 'src',
    image: 'xlink:href'
  },
}
