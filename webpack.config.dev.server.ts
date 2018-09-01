require('dotenv').config()

import * as path from 'path'
import * as webpack from 'webpack'
import * as CleanWebpackPlugin from 'clean-webpack-plugin'
import * as webpackNodeExternals from 'webpack-node-externals'
import baseConfig, { IWebpackConfiguration } from './webpack.config.base'

const { NODE_ENV = 'development', RESTAURANTS_ENDPOINT } = process.env

interface IWebpackConfigOutput {
  filename: string;
  path: string;
}

export interface IWebpackConfigurationDev extends IWebpackConfiguration {
  output: IWebpackConfigOutput;
}

const base = baseConfig(true)

const config: IWebpackConfigurationDev = {
  ...base,
  name: 'server',
  mode: 'development',
  externals: [webpackNodeExternals()],
  plugins: [
    new CleanWebpackPlugin(['dist-dev'], { verbose: true }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(NODE_ENV),
      'process.env.RESTAURANTS_ENDPOINT': JSON.stringify(RESTAURANTS_ENDPOINT),
      'process.env.FIREBASE_API_KEY': JSON.stringify(process.env.FIREBASE_API_KEY),
      'process.env.FIREBASE_AUTH_DOMAIN': JSON.stringify(process.env.FIREBASE_AUTH_DOMAIN),
    }),
  ],
  target: 'node',
  entry: ['./src/server/dev.tsx'],
  output: {
    filename: 'server.js',
    path: path.resolve(__dirname, 'dist-dev'),
  },
}

export default config
