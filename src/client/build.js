'use strict';

let path = require('path');
let webpack = require('webpack');
let watch = process.argv.slice(2).some(x => x.startsWith('watch'));

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
    modulesDirectories: [ 'node_modules', 'lib' ]
  },
  entry: [
    path.join(__dirname, 'index.html'),
    path.join(__dirname, 'src/app.js'),
  ],
  module: {
    loaders: [{
      test: /\.html$/,
      loader: 'file?name=[name].[ext]',
    }, {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        plugins: ['transform-es2015-modules-commonjs'],
        presets: ['es2015', 'stage-0'],
      }
    }, {
      test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: 'url-loader?limit=10000&mimetype=application/font-woff&name=fonts/[name].[ext]'
    }]
  },
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
});

if (watch) {
  compiler.watch({
    aggregateTimeout: 300,
    poll: true
  }, function(err, stats) {
    console.log(stats.toString({ colors: true }));
    if (err) {
      console.error(err);
    }
  });
} else {
  compiler.run((err, stats) => {
    console.log(stats.toString({ colors: true }));
    if (err) {
      console.error(err);
      process.exit(1);
    }
    process.exit(0);
  });
}