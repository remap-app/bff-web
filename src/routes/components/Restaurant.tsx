import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { RouteConfig } from 'react-router-config'

export interface IProps extends RouteComponentProps<void> {
  route?: RouteConfig;
}

export const RestaurantRoute = (): JSX.Element => <div>Restaurant</div>

export default RestaurantRoute
