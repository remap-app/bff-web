import * as express from 'express'
import 'express-async-errors'
import routes from '../routes'
import api from '../routes/api'

const server = express()

server.use(express.static('public'))
server.use('/api', api)
server.use('*', routes)
server.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  next(err)
})

const { PORT = 3000 } = process.env
server.listen(PORT, (error: Error) => {
  if (error) {
    // TODO: send bug report to some tird party service
    console.log(error) // eslint-disable-line no-console
  }
})
