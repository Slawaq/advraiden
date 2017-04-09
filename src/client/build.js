'use strict'

let path = require('path')
let webpack = require('webpack')
let watch = process.argv.slice(2).some(x => x.startsWith('watch'))
let prod = process.argv.slice(2).some(x => x.startsWith('prod'))
let macros = require('../../config.json').macros

let compiler = webpack({
  target: 'web',
  devtool: watch ? 'eval' : 'none',
  output: {
    path: path.join(__dirname, 'output'),
    filename: 'app.js',
    publicPath: '/'
  },
  resolve: {
    extensions: [ '', '.jsx', '.js' ],
    modulesDirectories: [ 'node_modules', 'lib', 'components' ]
  },
  entry: [
    path.join(__dirname, '/index.html'),
    path.join(__dirname, 'src/app.js'),
  ],
  module: {
    loaders: [ {
      test: /\.html$/,
      exclude: /index/,
      loader: 'file?name=[path][name].[ext]',
    }, {
      test: /\.html$/,
      include: /index/,
      loader: 'file?name=[name].[ext]',
    }, {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        plugins: [ 'transform-runtime', 'transform-es2015-modules-commonjs' ],
        presets: [ 'es2015', 'stage-0' ],
      }
    },
    { test: /\.json$/, loader: 'json-loader' },
    { test: /\.less$/, loader: 'style!css!postcss-loader!less' },
    { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file' },
    { test: /\.(woff|woff2)$/, loader: 'url?prefix=font/&limit=5000' },
    { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream' },
    { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml' }
    ]
  },
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(prod ? 'production' : 'development')
      },
      'ADV_MACROS': JSON.stringify(macros)
    })
  ]
})

if (watch)
  compiler.watch({
    aggregateTimeout: 300,
    poll: true
  }, (err, stats) => {
    console.log(stats.toString({ colors: true }))
    if (err)
      console.error(err)
  })
else
  compiler.run((err, stats) => {
    console.log(stats.toString({ colors: true }))
    if (err) {
      console.error(err)
      process.exit(1)
    }
    process.exit(0)
  })
