import * as express from 'express'
import * as React from 'react'
import { renderToNodeStream } from 'react-dom/server'
import { Provider as ReduxProvider } from 'react-redux'
import { StaticRouter } from 'react-router'
import { createMemoryHistory } from 'history'
import { Html } from '../template/Html'
import { Routes } from './Routes'
import { Restaurants } from '../api/restaurants'
import { IQuery } from '../api/restaurants'
import configureStore from '../store/configureStore.dev'

const router = express.Router()

const hasLocation = (query: IQuery) => !!query.latitude && !!query.longitude

router.get('*', async (req: express.Request, res: express.Response) => {
  const restaurants = await (
    hasLocation(req.query)
      ? Restaurants.getList(req.query)
      : Promise.resolve({})
  )

  res.write('<!doctype html>')

  // dev assets
  let assets = null
  if (res.locals && res.locals.webpackStats) {
    const { assetsByChunkName: { main } } = res.locals.webpackStats.toJson()
    const normalized = Array.isArray(main) ? main : [main]
    assets = normalized.reduce(
      (ret, pathname) => {
        const type = pathname.endsWith('.js') ? 'js' : pathname.endsWith('.css') ? 'css' : null
        if (!type) return ret
        return { ...ret, [type]: [...ret[type], pathname] }
      },
      { js: [], css: [] }
    )
  }
  const { store, history } = configureStore({ restaurants }, createMemoryHistory())
  const context: { url?: string; } = {}
  const app = (
    <StaticRouter location={req.url} context={context}>
      <Routes />
    </StaticRouter>
  )

  if (context.url) {
    res.writeHead(302, { Location: context.url })
    res.end()
  } else {
    renderToNodeStream(
      <Html
        lang='ja'
        title='App'
        publicPath='/'
        initialData={JSON.stringify(store.getState())}
        assets={assets}
      >
        <ReduxProvider store={store}>
          {app}
        </ReduxProvider>
      </Html>
    ).pipe(res)
  }
})

export default router
