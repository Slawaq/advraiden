'use strict';

let path = require('path');
let webpack = require('webpack');

let compiler = webpack({
  target: 'web',
  output: {
    path: path.join(__dirname, 'output'),
    filename: 'app.js',
    publicPath: '/'
  },
  resolve: {
    extensions: [ '', '.jsx', '.js' ],
  },
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  },
  entry: [
    path.join(__dirname, 'index.html'),
    path.join(__dirname, 'src/app.js'),
  ],
  module: {
    loaders: [{
      test: /\.html$/,
      loader: 'file?name=[name].[ext]',
    }]
  }
});

compiler.run((err, stats) => {
  console.log(stats.toString({ colors: true }));
  if (err) {
    console.error(err);
    process.exit(1);
  }
  process.exit(0);
});
