const express = require('express')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const webpackConfig = require('./webpack.config')

const app = express()
const compiler = webpack(webpackConfig)

app.use(webpackDevMiddleware(compiler, {
  publicPath: webpackConfig.output.publicPath
}))
app.use(webpackHotMiddleware(compiler))
const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port ${port}!`))
