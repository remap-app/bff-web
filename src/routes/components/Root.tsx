import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { RouteConfig } from 'react-router-config'
import Top from '../../pages/Top'

export interface IRootProps extends RouteComponentProps<void> {
  route?: RouteConfig;
}

export const Root = (props: IRootProps): JSX.Element => <Top />
