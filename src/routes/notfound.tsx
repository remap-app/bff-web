import * as express from 'express'
import * as React from 'react'
import { renderToNodeStream } from 'react-dom/server'
import { Html } from '../template/Html'
import { Root } from '../containers/Root'

export const notfound = async (req: express.Request, res: express.Response) => {
  const initialData = { restaurants: {} }
  res.status(404)
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
}
