import { ParsedUrlQuery } from 'querystring'
import { Router, Request, Response } from 'express'
import * as React from 'react'
import { Action } from 'redux'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import { matchRoutes, MatchedRoute } from 'react-router-config'
import { SheetsRegistry } from 'react-jss/lib/jss'
import JssProvider from 'react-jss/lib/JssProvider'
import { createMuiTheme, createGenerateClassName } from '@material-ui/core/styles'
import { createStyleduxStore, mapStateOnServer } from 'styledux'
import { Root } from '../containers/Root'
import { App } from '../containers/App'
import configureStore from '../store/configureStore.dev'
import { routesConfig } from './routesConfig'
import render from '../server/render'
import { IState } from '../reducer'
import { theme } from '../style/theme'

const router = Router()

export interface IRouteContext {
  req: Request;
  res: Response;
  query: ParsedUrlQuery;
  pathname: string;
  params: { [key: string]: string };
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
      <App />
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
        params: match.params,
        originalUrl: req.originalUrl,
        state: store.getState(),
      }

      const actionOrActions = await component.getInitialAction(context)
      const finalAction: Action[] = Array.isArray(actionOrActions)
        ? actionOrActions
        : [actionOrActions]

      await Promise.all(
        finalAction.filter(a => !!a).map(a => store.dispatch(a))
      )
    }
  }

  const styleStore = createStyleduxStore()

  const sheetsRegistry = new SheetsRegistry()

  // Create a sheetsManager instance.
  const sheetsManager = new Map()

  // Create a theme instance.
  const muiTheme = createMuiTheme(theme)

  // Create a new class name generator.
  const generateClassName = createGenerateClassName()

  const body = renderToString(
    <JssProvider registry={sheetsRegistry} generateClassName={generateClassName}>
      <Root reduxStore={store} styleduxStore={styleStore} theme={muiTheme} sheetsManager={sheetsManager}>
        {app}
      </Root>
    </JssProvider>
  )

  const styles = mapStateOnServer(styleStore)
  const css = sheetsRegistry.toString()

  res.status(200).write(
    render(body, {
      lang: 'ja',
      title: 'App',
      assets,
      styles,
      initialData: store.getState(),
      publicPath: '/',
      css,
    })
  )
  res.end()

  // TODO: want to use stream
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
