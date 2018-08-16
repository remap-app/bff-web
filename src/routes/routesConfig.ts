import { RouteConfig } from 'react-router-config'
import { Root } from './components/Root'
import { Notfound } from './components/Notfound'

export const routesConfig: RouteConfig[] = [
  {
    path: '/',
    component: Root,
    exact: true,
  },
  {
    component: Notfound,
  },
]
