require('dotenv').config()

import * as path from 'path'
import * as webpack from 'webpack'
import * as CleanWebpackPlugin from 'clean-webpack-plugin'
import baseConfig, { IWebpackConfiguration } from './webpack.config.base'

interface IWebpackConfigOutput {
  filename: string;
  path: string;
  publicPath: string;
}

export interface IWebpackConfigurationDev extends IWebpackConfiguration {
  output: IWebpackConfigOutput;
}

const base = baseConfig(true)

const config: IWebpackConfigurationDev = {
  ...base,
  name: 'client',
  mode: 'development',
  plugins: [
    new CleanWebpackPlugin(['public-dev'], { verbose: true }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
      'process.env.ASSET_PATH': JSON.stringify('/'),
      'process.env.RESTAURANTS_ENDPOINT': JSON.stringify(process.env.RESTAURANTS_ENDPOINT),
      'process.env.FIREBASE_API_KEY': JSON.stringify(process.env.FIREBASE_API_KEY),
      'process.env.FIREBASE_AUTH_DOMAIN': JSON.stringify(process.env.FIREBASE_AUTH_DOMAIN),
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  entry: [
    'cross-fetch/polyfill',
    './src/client/index.tsx',
    'webpack-hot-middleware/client',
  ],
  output: {
    filename: 'client.js',
    path: path.resolve(__dirname, 'public-dev', 'assets'),
    publicPath: '/',
  },
}

export default config
