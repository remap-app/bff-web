import 'cross-fetch/polyfill'
import { resolve } from 'path'
import * as express from 'express'
import 'express-async-errors'
import * as bodyParser from 'body-parser'
import _cookiesMiddleware = require('universal-cookie-express')
import routes from '../routes'
import apiRoutes from '../routes/api'
import { errorHandler } from './errorHandler'

const server = express()
const { PORT = 3000 } = process.env

const cookiesMiddleware = _cookiesMiddleware.default || _cookiesMiddleware // FIXME

server.use(bodyParser.json())
server.use(express.static(resolve(process.cwd(), 'public')))
server.use(cookiesMiddleware())
server.use('/api', apiRoutes) // should be above top more than '/'
server.use('/', routes)
server.use(errorHandler)
server.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  next(err)
})

server.listen(PORT, (error: Error) => {
  if (error) {
    // TODO: send bug report to some tird party service
    console.log(error) // eslint-disable-line no-console
  }
})
