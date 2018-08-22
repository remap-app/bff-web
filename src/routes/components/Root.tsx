import { parse as parseQueryString } from 'querystring'
import * as React from 'react'
import { RouteComponentProps, Redirect } from 'react-router-dom'
import { RouteConfig } from 'react-router-config'
import Top, { getInitialAction } from '../../pages/Top'

export interface IRootProps extends RouteComponentProps<void> {
  route?: RouteConfig;
}

const Root: any = (props: IRootProps) => {
  const q = parseQueryString(props.location.search.slice(1))
  if (!q.latitude || !q.longitude) {
    return <Redirect to='/notfound' />
  }
  return <Top />
}

Root.getInitialAction = getInitialAction

export default Root
