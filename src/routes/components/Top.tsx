import * as React from 'react'
import { RouteComponentProps, Redirect } from 'react-router-dom'
import { RouteConfig } from 'react-router-config'

export interface IProps extends RouteComponentProps<void> {
  route?: RouteConfig;
}

export const Top = (): JSX.Element => <Redirect to='/restaurants' />

export default Top
