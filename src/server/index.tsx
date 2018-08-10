import * as express from 'express'
import * as React from 'react'
import { renderToNodeStream } from 'react-dom/server'
import { Html } from '../template/Html'
import { Root } from '../containers/Root'

const server = express()

server.use(express.static('dist'))

const initialData = {
  test: 1,
}

server.get('/', (_, res) => {
  res.write('<!doctype html>')
  renderToNodeStream(
    <Html initialData={JSON.stringify(initialData)}>
      <Root />
    </Html>
  ).pipe(res)
})

const { PORT = 3000 } = process.env
server.listen(PORT, (error: Error) => {
  if (error) {
    console.log(error)
  } else {
    if (process.env.NODE_ENV !== 'production') {
      console.log(`Listening on port ${PORT}!`)
    }
  }
})
