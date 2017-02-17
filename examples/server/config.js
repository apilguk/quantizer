import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
// import ExtractTextPlugin from 'extract-text-webpack-plugin';


export default {
  debug: true,
  cache: true,
  devtool: 'eval',
  inline: true,
  entry: [
    'webpack-hot-middleware/client?http://localhost:3000&reload=true&noInfo=true&quiet=true',
    'webpack/hot/only-dev-server',
    path.join(__dirname, '../../examples/entry.js')
  ],
  stats: {
    colors: true,
    reasons: false,
    hash: false,
    version: false,
    timings: true,
    chunks: false,
    chunkModules: false,
    cached: false,
    cachedAssets: false
  },
  noInfo: true,
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    // new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '../../examples/index.html'),
      inject: 'body',
      filename: 'index.html'
    })
    // new webpack.optimize.OccurenceOrderPlugin()
  ],
  output: {
    path: path.join(__dirname, `../../examples`),
    filename: `[name].js`,
    publicPath: '/'
  },
  resolve: {
    modulesDirectories: ['node_modules'],
    // alias: {
    // 	quantizer: path.join(__dirname, '../../quantizer')
    // }
  },
  module: {
    loaders: [{
      test: /\.(png|woff|woff2|eot|ttf|svg|jpg|jpeg|gif)$/,
      exclude: /node_modules/,
      loader: 'url-loader?limit=100000'
    }, {
      test: /\.json?$/,
      loader: 'json'
    }, {
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }, {
      test: /\.sass/,
      loaders: [
        'style',
        'css',
        'sass'
      ]
    }],
    noParse: /node_modules\/quill\/dist/
  }
};
