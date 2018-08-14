import * as express from 'express'
import * as React from 'react'
import { renderToNodeStream } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import { Html } from '../template/Html'
import { Routes } from './Routes'
import { Restaurants } from '../services/restaurants'
import { IQuery } from '../services/restaurants/types'

const router = express.Router()

const hasLocation = (query: IQuery) => !!query.latitude && !!query.longitude

router.get('*', async (req: express.Request, res: express.Response) => {
  const restaurants = await (
    hasLocation(req.query)
      ? Restaurants.getList(req.query)
      : Promise.resolve({})
  )

  const initialData = { restaurants }

  res.write('<!doctype html>')

  const context = {}
  renderToNodeStream(
    <Html
      lang='ja'
      title='App'
      publicPath='/'
      initialData={JSON.stringify(initialData)}
    >
      <StaticRouter location={req.url} context={context}>
        {Routes}
      </StaticRouter>
    </Html>
  ).pipe(res)
})

export default router
