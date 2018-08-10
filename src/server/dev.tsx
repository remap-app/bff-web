import * as express from 'express'
import * as React from 'react'
import { renderToNodeStream } from 'react-dom/server'
import * as webpack from 'webpack'
import * as webpackDevMiddleware from 'webpack-dev-middleware'
import * as webpackHotMiddleware from 'webpack-hot-middleware'
import { Html } from '../template/Html'
import { Root } from '../containers/Root'

const config = require('../../webpack.config.dev')()
const server = express()
const compiler = webpack(config)

server.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
}))
server.use(webpackHotMiddleware(compiler))

server.use(express.static('dev'))

const initialData = {
  test: 1,
}

server.get('/', (_, res) => {
  res.write('<!doctype html>')
  renderToNodeStream(
    <Html
      title='App'
      publicPath={config.output.publicPath}
      initialData={JSON.stringify(initialData)}
    >
      <Root />
    </Html>
  ).pipe(res)
})

const { PORT = 3000 } = process.env
server.listen(PORT, (error: Error) => {
  if (error) {
    console.log(error)
  } else {
    console.log(`Listening on port ${PORT}!`)
  }
})
