import * as path from 'path'
import * as webpack from 'webpack'
import * as CleanWebpackPlugin from 'clean-webpack-plugin'
import baseConfig from './webpack.config.base'

const { NODE_ENV = 'development', ASSET_PATH = '/' } = process.env

export default (): webpack.Configuration[] => {
  return [
    {
      ...baseConfig,
      mode: 'production',
      plugins: [
        new CleanWebpackPlugin(['dist'], { verbose: true }),
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify(NODE_ENV),
        }),
      ],
      target: 'node',
      entry: './src/server/index.tsx',
      output: {
        filename: 'server.js',
        path: path.resolve(__dirname, 'dist'),
      },
    },
    {
      ...baseConfig,
      mode: 'production',
      plugins: [
        new CleanWebpackPlugin(['public'], { verbose: true }),
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify(NODE_ENV),
          'process.env.ASSET_PATH': JSON.stringify(ASSET_PATH),
        }),
      ],
      entry: './src/client.tsx',
      output: {
        filename: 'client.js',
        path: path.resolve(__dirname, 'public'),
        publicPath: ASSET_PATH,
      },
    },
  ]
}
