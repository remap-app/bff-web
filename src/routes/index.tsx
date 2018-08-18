import * as express from 'express'
import * as React from 'react'
import { renderToNodeStream } from 'react-dom/server'
import { Provider as ReduxProvider } from 'react-redux'
import { StaticRouter } from 'react-router'
import { matchRoutes, MatchedRoute } from 'react-router-config'
import { Html } from '../template/Html'
import { Root } from '../containers/Root'
import configureStore from '../store/configureStore.dev'
import { routesConfig } from './routesConfig';

const router = express.Router()

router.get('*', async (req: express.Request, res: express.Response) => {
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

  const context: { url?: string; } = {}
  const app = (
    <StaticRouter location={req.url} context={context}>
      <Root />
    </StaticRouter>
  )

  if (context.url) {
    res.writeHead(302, { Location: context.url })
    res.end()
  } else {
    // Prepare initial state
    const store = configureStore()
    const matchedRoutes: MatchedRoute<{}>[] = matchRoutes<{}>(routesConfig, req.path)
    for (const { route, match } of matchedRoutes) {
      const component: any = route.component
      if (component.getInitialAction && typeof component.getInitialAction === 'function') {
        const action = await component.getInitialAction(req, match, store.getState())
        store.dispatch(action)
      }
    }

    res.write('<!doctype html>')
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
