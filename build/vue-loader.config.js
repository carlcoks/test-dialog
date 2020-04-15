module.exports = {
  extractCSS: process.env.NODE_ENV === 'production',
  preserveWhitespace: false,
  transformToRequire: {
    video: 'src',
    source: 'src',
    img: 'src',
    image: 'xlink:href',
  },
};
