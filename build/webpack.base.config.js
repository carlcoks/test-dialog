const path = require('path')
const webpack = require('webpack');
// const vueConfig = require('./vue-loader.config');
const vueConfig = require('./vue-loader.conf');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');

const isProduction = process.env.NODE_ENV === 'production';

function resolve (dir) {
  return path.resolve(path.join(__dirname, '..'), dir);
}

const webpackConfig = {
  devtool: isProduction
    ? '#source-map'
    : '#cheap-module-source-map',
  output: {
    path: resolve('./dist'),
    publicPath: '/dist/',
    filename: '[name].[chunkhash].bundle.js',
    chunkFilename: '[name].[chunkhash].js',
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      '@': resolve('src'),
      vue$: 'vue/dist/vue.common.js',
    }
  },
  module: {
    noParse: /es6-promise\.js$/,
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: isProduction
          ? ExtractTextPlugin.extract({
            use: 'css-loader?minimize',
            fallback: 'vue-style-loader',
          })
          : ['vue-style-loader', 'css-loader'],
      },
      // {
      //   test: /\.(scss|sass)$/,
      //   use: [{
      //       loader: "style-loader" // creates style nodes from JS strings
      //   }, {
      //       loader: "css-loader" // translates CSS into CommonJS
      //   }, {
      //       loader: "sass-loader" // compiles Sass to CSS
      //   }]
      // },
      {
        test: /\.(png|jpe?g|gif)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 2 * 1024,
          name: '[name].[hash:7].[ext]',
        },
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 2 * 1024,
          name: '[name].[hash:7].[ext]',
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 2 * 1024,
          name: '[name].[hash:7].[ext]',
        }
      },
      {
        test: /\.svg$/,
        oneOf: [
          {
            resourceQuery: /inline/,
            use: 'html-loader'
          },
          {
            loader: 'svg-sprite-loader',
            options: {
              extract: true,
            }
          }
        ]
      }
    ]
  },
  performance: {
    maxEntrypointSize: 300000,
    hints: isProduction ? 'warning' : false,
  },
}

if (isProduction) {
  webpackConfig.plugins = [
    // new webpack.optimize.UglifyJsPlugin({
    //   compress: { warnings: false },
    // }),
    new UglifyJsPlugin({
      uglifyOptions: {
        compress: {
          warnings: false
        }
      },
      parallel: true,
      sourceMap: true
    }),
    new ExtractTextPlugin({
      filename: 'common.[chunkhash].css',
      allChunks: true,
    }),
    new webpack.HashedModuleIdsPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new SpriteLoaderPlugin({ plainSprite: true }),
  ];
} else {
  // webpackConfig.module.rules.unshift({
  //   test: /\.(js|vue)$/,
  //   loader: 'eslint-loader',
  //   enforce: 'pre',
  //   include: [resolve('src'), resolve('test')],
  //   options: {
  //     formatter: require('eslint-friendly-formatter'),
  //   },
  // });

  webpackConfig.plugins = [
    new SpriteLoaderPlugin({ plainSprite: true }),
    new FriendlyErrorsPlugin(),
  ];
}

module.exports = webpackConfig;
