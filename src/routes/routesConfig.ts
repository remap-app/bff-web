import { RouteConfig } from 'react-router-config'
import { Root } from './components/Root'
import { Notfound } from './components/Notfound'
import { IState } from '../reducer'

export interface IRouteConfig extends RouteConfig {
  getInitialProps?: (state: IState, props: any) => any
}

export const routesConfig: IRouteConfig[] = [
  {
    component: Root,
    path: '/',
    exact: true,
  },
  {
    component: Notfound,
  },
]
