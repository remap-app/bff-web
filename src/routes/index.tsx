import { ParsedUrlQuery } from 'querystring'
import { Router, Request, Response } from 'express'
import * as React from 'react'
import { renderToString } from 'react-dom/server'
import { Provider as ReduxProvider } from 'react-redux'
import { StaticRouter } from 'react-router'
import { matchRoutes, MatchedRoute } from 'react-router-config'
import { createStyleduxStore, StyleduxProvider, mapStateOnServer } from 'styledux'
import { Root } from '../containers/Root'
import configureStore from '../store/configureStore.dev'
import { routesConfig } from './routesConfig';
import render from '../server/render'
import { IState } from '../reducer'

const router = Router()

export interface IRouteContext {
  req: Request;
  res: Response;
  query: ParsedUrlQuery;
  pathname: string;
  params: object;
  originalUrl: string;
  state: IState;
}

router.get('*', async (req: Request, res: Response) => {
  // dev assets
  let assets: any = null
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
    return
  }

  const store = configureStore()

  // Prepare initial state
  const matchedRoutes: MatchedRoute<{}>[] = matchRoutes<{}>(routesConfig, req.path)
  for (const { route, match } of matchedRoutes) {
    const component: any = route.component
    if (typeof component.getInitialAction === 'function') {
      const context: IRouteContext = {
        req,
        res,
        pathname: req.path,
        query: req.query,
        params: req.params,
        originalUrl: req.originalUrl,
        state: store.getState(),
      }
      const action = await component.getInitialAction(context)
      await store.dispatch(action)
    }
  }

  const styleStore = createStyleduxStore()

  const body = renderToString(
    <ReduxProvider store={store}>
      <StyleduxProvider store={styleStore}>
        {app}
      </StyleduxProvider>
    </ReduxProvider>
  )

  const styles = mapStateOnServer(styleStore)

  res.status(200).write(
    render(body, {
      lang: 'ja',
      title: 'App',
      assets,
      styles,
      initialData: store.getState(),
      publicPath: '/',
    })
  )
  res.end()

  // TODO:
  // res.write('<!doctype html>')
  // renderToNodeStream(
  //   <Html
  //     lang='ja'
  //     title='App'
  //     publicPath='/'
  //     initialData={JSON.stringify(store.getState())}
  //     assets={assets}
  //     styles={styles}
  //   >
  //     {htmlToReactParser.parse(s)}
  //   </Html>
  // ).pipe(res)
})

export default router
