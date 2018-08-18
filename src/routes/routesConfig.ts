import { RouteConfig } from 'react-router-config'
import Root from './components/Root'
import { Notfound } from './components/Notfound'

export const routesConfig: RouteConfig[] = [
  {
    component: Root,
    path: '/',
    exact: true,
  },
  {
    component: Notfound,
  },
]
