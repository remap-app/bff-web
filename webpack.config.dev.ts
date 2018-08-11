import * as path from 'path'
import * as webpack from 'webpack'
import * as CleanWebpackPlugin from 'clean-webpack-plugin'
import baseConfig from './webpack.config.base'

const config: webpack.Configuration = {
  ...baseConfig,
  mode: 'development',
  plugins: [
    new CleanWebpackPlugin(['dev'], { verbose: true }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
      'process.env.ASSET_PATH': JSON.stringify('/'),
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
    publicPath: '/',
  },
}

export default config
