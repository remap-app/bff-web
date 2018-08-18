require('dotenv').config()

import * as path from 'path'
import * as webpack from 'webpack'
import * as webpackNodeExternals from 'webpack-node-externals'
import * as CleanWebpackPlugin from 'clean-webpack-plugin'
import baseConfig, { IWebpackConfiguration } from './webpack.config.base'

const { NODE_ENV = 'development', ASSET_PATH = '/', RESTAURANTS_ENDPOINT } = process.env

export default (): IWebpackConfiguration[] => {
  return [
    // server
    {
      ...baseConfig,
      name: 'server',
      mode: 'production',
      externals: [webpackNodeExternals()],
      plugins: [
        new CleanWebpackPlugin(['dist'], { verbose: true }),
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify(NODE_ENV),
          'process.env.RESTAURANTS_ENDPOINT': JSON.stringify(RESTAURANTS_ENDPOINT),
        }),
      ],
      target: 'node',
      entry: ['./src/server/index.tsx'],
      output: {
        filename: 'server.js',
        path: path.resolve(__dirname, 'dist'),
      },
    },

    // client
    {
      ...baseConfig,
      name: 'client',
      mode: 'production',
      plugins: [
        new CleanWebpackPlugin(['public'], { verbose: true }),
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify(NODE_ENV),
          'process.env.ASSET_PATH': JSON.stringify(ASSET_PATH),
          'process.env.RESTAURANTS_ENDPOINT': JSON.stringify(RESTAURANTS_ENDPOINT),
        }),
      ],
      entry: [
        'cross-fetch/polyfill',
        './src/client/index.tsx',
      ],
      output: {
        filename: 'client.js',
        path: path.resolve(__dirname, 'public', 'assets'),
        publicPath: ASSET_PATH,
      },
    },
  ]
}
