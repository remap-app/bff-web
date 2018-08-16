import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { RouteConfig } from 'react-router-config'
import { Root as RootContainer } from '../../containers/Root'

export interface IRootProps extends RouteComponentProps<void> {
  route?: RouteConfig;
}

export const Root = (props: IRootProps): JSX.Element => <RootContainer restaurants={{}} />
