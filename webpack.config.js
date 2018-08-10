const path = require('path')
const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')

const { NODE_ENV = 'development', ASSET_PATH = '/' } = process.env

module.exports = (env, argv) => {
  console.log('env', env)
  const base = {
    mode: NODE_ENV === 'production' ? NODE_ENV : 'development',
    plugins: [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(NODE_ENV),
        'process.env.ASSET_PATH': JSON.stringify(ASSET_PATH),
      }),
      new webpack.HotModuleReplacementPlugin(),
    ],
    entry: './src/server/index.tsx',
    output: {
      filename: 'server.js',
      path: path.resolve(__dirname, 'dist'),
    },
    devtool: 'source-map',
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.json'],
    },
    module: {
      rules: [
        { test: /\.tsx?$/, loader: 'awesome-typescript-loader' },
        { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' },
      ]
    },
  }

  if (env.platform === 'server') {
    base.target = 'node';
    base.plugins.unshift(
      new CleanWebpackPlugin(['dist'], { verbose: true })
    )
  }

  if (env.platform === 'client') {
    base.plugins.unshift(
      new CleanWebpackPlugin(['public'], { verbose: true })
    )
    base.entry = [
      './src/client.tsx',
    ];
    base.output.filename = 'client.js';
    base.output.path = path.resolve(__dirname, 'public');
    base.output.publicPath = ASSET_PATH;
    if (base.mode !== 'production') {
      base.entry.push('webpack-hot-middleware/client')
    }
  }

  return base
}
