import 'cross-fetch/polyfill'
import { resolve } from 'path'
import * as express from 'express'
import 'express-async-errors'
import * as webpack from 'webpack'
import * as webpackDevMiddleware from 'webpack-dev-middleware'
import * as webpackHotMiddleware from 'webpack-hot-middleware'
import routes from '../routes'
import apiRoutes from '../routes/api'
import webpackConfig from '../../webpack.config.dev.client'
import { errorHandler } from './errorHandler'

const server = express()
const { PORT = 3000 } = process.env

// dev
const compiler = webpack(webpackConfig)
server.use(webpackDevMiddleware(compiler, {
  publicPath: webpackConfig.output.publicPath,
  serverSideRender: true,
  logLevel: 'silent',
}))
server.use(webpackHotMiddleware(compiler, {
  log: false,
}))

server.use(express.static(resolve(process.cwd(), 'dev')))
server.use('/api', apiRoutes) // should be above top more than '/'
server.use('/', routes)
server.use(errorHandler)
server.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  next(err)
})

server.listen(PORT, (error: Error) => {
  if (error) {
    console.log(error) // eslint-disable-line no-console
  } else {
    console.log(`Listening on port ${PORT}!`) // eslint-disable-line no-console
  }
})
