require('dotenv').config()

import * as path from 'path'
import * as webpack from 'webpack'
import * as CleanWebpackPlugin from 'clean-webpack-plugin'
import * as FriendlyErrorsWebpackPlugin from 'friendly-errors-webpack-plugin'
import baseConfig, { IWebpackConfiguration } from './webpack.config.base'

interface IWebpackConfigOutput {
  filename: string;
  path: string;
  publicPath: string;
}

export interface IWebpackConfigurationDev extends IWebpackConfiguration {
  output: IWebpackConfigOutput;
}

const config: IWebpackConfigurationDev = {
  ...baseConfig,
  name: 'client',
  mode: 'development',
  plugins: [
    new CleanWebpackPlugin(['dev'], { verbose: true }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
      'process.env.ASSET_PATH': JSON.stringify('/'),
      'process.env.RESTAURANTS_ENDPOINT': JSON.stringify(process.env.RESTAURANTS_ENDPOINT),
    }),
    new webpack.HotModuleReplacementPlugin(),
    new FriendlyErrorsWebpackPlugin(),
  ],
  entry: [
    'cross-fetch/polyfill',
    './src/client/index.tsx',
    'webpack-hot-middleware/client',
  ],
  output: {
    filename: 'client.js',
    path: path.resolve(__dirname, 'dev', 'assets'),
    publicPath: '/',
  },
}

export default config
