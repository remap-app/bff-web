import { RouteConfig } from 'react-router-config'
import Top from './components/Top'
import Notfound from './components/Notfound'
import Restaurants from './components/Restaurants'
import Restaurant from './components/Restaurant'
import Stocks from './components/Stocks'

export const routesConfig: RouteConfig[] = [
  {
    component: Top,
    path: '/',
    exact: true,
  },
  {
    component: Restaurants,
    path: '/restaurants',
    exact: true,
  },
  {
    component: Restaurant,
    path: '/restaurants/:id',
    exact: true,
  },
  {
    component: Stocks,
    path: '/stocks',
    exact: true,
  },
  {
    component: Notfound,
  },
]
