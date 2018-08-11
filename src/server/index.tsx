import * as express from 'express'
import * as React from 'react'
import { renderToNodeStream } from 'react-dom/server'
import { Html } from '../template/Html'
import { Root } from '../containers/Root'

const server = express()

server.use(express.static('public'))

const initialData = {
  restaurants: 1, // tmp
}

server.get('/', (_, res) => {
  res.write('<!doctype html>')
  renderToNodeStream(
    <Html
      title='App'
      publicPath='/'
      initialData={JSON.stringify(initialData)}
    >
      <Root {...initialData} />
    </Html>
  ).pipe(res)
})

const { PORT = 3000 } = process.env
server.listen(PORT, (error: Error) => {
  if (error) {
    // TODO: send bug report to some tird party service
    console.log(error) // eslint-disable-line no-console
  }
})
