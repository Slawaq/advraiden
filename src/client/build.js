'use strict';

let path = require('path');
let webpack = require('webpack');
let ExtractTextPlugin = require('extract-text-webpack-plugin');
let watch = process.argv.slice(2).some(x => x.startsWith('watch'));
let prod = process.argv.slice(2).some(x => x.startsWith('prod'));

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
    loaders: [{
      test: /\.html$/,
      exclude: /index/,
      loader: 'file?name=[path][name].[ext]',
    }, {
      test: /\.html$/,
      include: /index/,
      loader: 'file?name=[name].[ext]',
    }, {
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        plugins: ['transform-runtime', 'transform-es2015-modules-commonjs', 'transform-flow-strip-types'],
        presets: ['es2015', 'stage-0', 'react'],
      }
    },
    { test: /\.less$/, loader: 'style!css!postcss-loader!less' },
    { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file' },
    { test: /\.(woff|woff2)$/, loader: 'url?prefix=font/&limit=5000' },
    { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream' },
    { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml' },
    { test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader') }
    ]
  },
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  },
  postcss: [
    require('autoprefixer-core')
  ],
  plugins: [
    new ExtractTextPlugin('style.css', { allChunks: true }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(prod ? 'production' : 'development')
      }
    })
  ]
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