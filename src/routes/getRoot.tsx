import * as express from 'express'
import * as React from 'react'
import { renderToNodeStream } from 'react-dom/server'
import { Html } from '../template/Html'
import { Root } from '../containers/Root'
import { Restaurants } from '../services/restaurants'

export const getRoot = async (req: express.Request, res: express.Response) => {
  const restaurants = await Restaurants.getList(req.query)
  const initialData = { restaurants }
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
