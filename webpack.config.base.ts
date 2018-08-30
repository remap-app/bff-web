import * as webpack from 'webpack'

export interface IWebpackConfiguration extends webpack.Configuration {
  entry: string[];
  module: any;
}

const baseConfig = (dev: boolean): IWebpackConfiguration => {
  return {
    mode: 'none',
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.json'],
    },
    entry: [],
    module: {
      rules: [
        { test: /\.tsx?$/, loader: 'awesome-typescript-loader' },
        { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' },
        {
          test: /\.css$/,
          use: [
            { loader: 'styledux/loader' },
            {
              loader: 'css-loader',
              options: {
                modules: true,
                localIdentName: dev ? '[name]__[local]--[hash:base64:5]' : '[hash:base64:5]',
                camelCase: 'dashesOnly',
              },
            },
          ],
        },
      ],
    },
  }
}

export default baseConfig
