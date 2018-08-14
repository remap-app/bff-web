require('dotenv').config()

import * as path from 'path'
import * as webpack from 'webpack'
import * as CleanWebpackPlugin from 'clean-webpack-plugin'
import baseConfig from './webpack.config.base'

import { IWebpackConfiguration } from './webpack.config.base'

const { NODE_ENV = 'development', ASSET_PATH = '/', RESTAURANTS_ENDPOINT } = process.env

export default (): Array<IWebpackConfiguration> => {
  return [
    // server
    {
      ...baseConfig,
      mode: 'production',
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
