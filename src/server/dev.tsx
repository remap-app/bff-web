import 'isomorphic-fetch'
import * as express from 'express'
import * as webpack from 'webpack'
import * as webpackDevMiddleware from 'webpack-dev-middleware'
import * as webpackHotMiddleware from 'webpack-hot-middleware'
import routes from '../routes'
import webpackConfig from '../../webpack.config.dev'

const server = express()
const compiler = webpack(webpackConfig)
const { PORT = 3000 } = process.env

server.use(webpackDevMiddleware(compiler, {
  publicPath: webpackConfig.output.publicPath,
}))

server.use(webpackHotMiddleware(compiler))

server.use(express.static('dev'))

server.use('/', routes)

server.listen(PORT, (error: Error) => {
  if (error) {
    console.log(error) // eslint-disable-line no-console
  } else {
    console.log(`Listening on port ${PORT}!`) // eslint-disable-line no-console
  }
})
