const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const { NODE_ENV = 'development', ASSET_PATH = '/' } = process.env

module.exports = {
  mode: NODE_ENV === 'production' ? NODE_ENV : 'development',
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(NODE_ENV),
      'process.env.ASSET_PATH': JSON.stringify(ASSET_PATH),
    }),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin(),
  ],
  entry: [
    './src/index.tsx',
    'webpack-hot-middleware/client',
  ],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: ASSET_PATH,
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },
  module: {
    rules: [
      { test: /\.tsx?$/, loader: 'awesome-typescript-loader' },
      { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' },
    ]
  },
}
