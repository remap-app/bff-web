import * as webpack from 'webpack'

export type WebpackConfigEntry = Array<string>

export interface IWebpackConfiguration extends webpack.Configuration {
  entry: WebpackConfigEntry;
}

const baseConfig: IWebpackConfiguration = {
  mode: 'none',
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },
  entry: [
    'isomorphic-fetch',
  ],
  module: {
    rules: [
      { test: /\.tsx?$/, loader: 'awesome-typescript-loader' },
      { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' },
    ],
  },
}

export default baseConfig
