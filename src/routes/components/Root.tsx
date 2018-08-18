import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { RouteConfig } from 'react-router-config'
import Top, { getInitialAction } from '../../pages/Top'

export interface IRootProps extends RouteComponentProps<void> {
  route?: RouteConfig;
}

const Root: any = (props: IRootProps) => <Top /> // TODO

Root.getInitialAction = getInitialAction

export default Root
