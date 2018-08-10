const path = require('path')
const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')

const { NODE_ENV = 'development', ASSET_PATH = '/' } = process.env

module.exports = () => ({
  mode: 'development',
  plugins: [
    new CleanWebpackPlugin(['dev'], { verbose: true }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(NODE_ENV),
      'process.env.ASSET_PATH': JSON.stringify(ASSET_PATH),
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  entry: [
    './src/client.tsx',
    'webpack-hot-middleware/client',
  ],
  output: {
    filename: 'client.js',
    path: path.resolve(__dirname, 'dev'),
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
    ],
  },
})
