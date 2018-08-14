import * as React from 'react'
import { Switch, Route } from 'react-router'
import { Link } from 'react-router-dom'
import { Root } from '../containers/Root'

export const Routes = (
  <Switch>
    <Route exact path='/' component={Root} />
    <Route component={() => <div>404 Not Found <Link to='/'>Top</Link></div>} />
  </Switch>
)
