import path from 'path'
import R from 'ramda'
import fs from 'fs'
import util from 'util'
import webpack from 'webpack'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import ManifestPlugin from 'webpack-manifest-plugin'
import HashPlugin from 'hash-webpack-plugin'
import oneJson from 'one-json-config'

import autoprefixer from 'autoprefixer'
import postcssBEM from 'postcss-bem'
import postcssCustomProperties from 'postcss-custom-properties'
import postcssImport from 'postcss-import'
import postcssMixins from 'postcss-mixins'
import postcssNested from 'postcss-nested'
import postcssCustomMedia from 'postcss-custom-media'

const config = require('environmental').config()
const root = path.join(process.cwd(), 'src')

const fileNamePostfix = () => {
  if(config.env === 'development'){
    return ''
  } else {
    return '-[chunkhash]'
  }
}


const htmlExtractor = new ExtractTextPlugin("html", "[name].html")
const cssExtractor = new ExtractTextPlugin("css", `[name]${ fileNamePostfix() }.css`)

import layoutPlugin from './plugins/layout'


const loaders = [
  {
    test: /\.jsx?$/,
    exclude: /(node_modules|bower_components)/,
    loader: "babel",
    query: {
      presets: ['es2015', 'stage-0', 'react']
    }
  },
  {
    test: /\.jade$/,
    loaders: ['raw', 'jade-html']
  },
  {
    test: /\.md$/,
    loader: "html!markdown"
  },
  {
    test: /\.po$/,
    loaders: ['po']
  },
  {
    test: /\.jpg$|\.png$/,
    loaders: ['url']
  },
  {
    test: /\.svg$/,
    loaders: ['text', 'svgo']
  },
  {
    test: /\.css$/,
    loader: cssExtractor.extract('style', "css!postcss"),
    include: root
  },
  {
    test: /\.scss$/,
    loader: cssExtractor.extract(
      "style",
      "css!sass"
    )
  },
  {
    test: /\.json$/,
    loaders: ['json-loader']
  },
  {
    test: /layout\.html$/,
    loader: htmlExtractor.extract('html?attrs=link:href')
  }
]

const webpackAppConfig = {
  entry: {
    app: [
      "./src/initializers/client.js"
    ]
  },

  resolveLoader: {
    alias: {
      'text': path.join(__dirname, './loaders/text')
    }
  },

  resolve: {
    root: [
      path.join(__dirname, '../src')
    ],
    extensions: ['', '.js']
  },

  output: {
    path: "./public",
    'filename.production': `[name]-[chunkhash].js`,
    'filename.development': `[name].js`,
    publicPath: "/"
  },

  postcss: (webpack) => {
    return [
      postcssImport({ addDependencyTo: webpack, path: root }),
      postcssCustomProperties,
      postcssMixins,
      postcssBEM,
      postcssNested,
      postcssCustomMedia,
      autoprefixer
    ]
  },

  module: {
    loaders: loaders
  },

  'plugins.development': [
    cssExtractor,
    new webpack.optimize.CommonsChunkPlugin('vendor', `vendor.js`),
    new ManifestPlugin({
      filename: config.assets.manifest
    })
  ],

  'plugins.production': [
    cssExtractor,
    new webpack.optimize.CommonsChunkPlugin('vendor', `vendor-[chunkhash].js`),
    new ManifestPlugin({
      filename: config.assets.manifest
    })
  ]
}


const webpackDocsConfig = {
  entry: {
    docs: [
      "./documents/index.js"
    ]
  },

  resolveLoader: {
    alias: {
      'text': path.join(__dirname, './loaders/text')
    }
  },

  resolve: {
    root: [
      path.join(__dirname, '../src')
    ],
    extensions: ['', '.js']
  },

  output: {
    path: "./public",
    'filename.production': `[name]-[chunkhash].js`,
    'filename.development': `[name].js`,
    publicPath: "/"
  },

  postcss: (webpack) => {
    return [
      postcssImport({ addDependencyTo: webpack, path: root }),
      postcssCustomProperties,
      postcssMixins,
      postcssBEM,
      postcssNested,
      postcssCustomMedia,
      autoprefixer
    ]
  },

  module: {
    loaders: loaders
  },

  'plugins.development': [
    cssExtractor,
    new webpack.optimize.CommonsChunkPlugin('vendor', `vendor.js`),
    new ManifestPlugin({
      filename: config.assets.manifest
    })
  ],

  'plugins.production': [
    cssExtractor,
    new webpack.optimize.CommonsChunkPlugin('vendor', `vendor-[chunkhash].js`),
    new ManifestPlugin({
      filename: config.assets.manifest
    })
  ]
}

module.exports = [
  oneJson(webpackAppConfig, config.env, ['development', 'production'])
]
