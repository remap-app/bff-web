import * as webpack from 'webpack'

export interface IWebpackConfiguration extends webpack.Configuration {
  entry: string[];
}

const baseConfig: IWebpackConfiguration = {
  mode: 'none',
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },
  entry: [],
  module: {
    rules: [
      { test: /\.tsx?$/, loader: 'awesome-typescript-loader' },
      { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' },
    ],
  },
}

export default baseConfig
