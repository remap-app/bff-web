import * as React from 'react'
import { Request } from 'express'
import { connect } from 'react-redux'
import { match } from 'react-router'
import { App, IProps as IAppProps} from '../components/App'
import { IState } from '../reducer'
import { Restaurants, IQuery } from '../api/restaurants'
import { fetchRestaurantsReceive } from '../modules/restaurants'

export type IProps = IAppProps

const Top = (props: IProps): JSX.Element => {
  return (
    <App restaurants={props.restaurants} />
  )
}

export default connect(
  (state: IState) => ({ restaurants: state.restaurants.data })
)(Top)

const hasLocation = (query?: IQuery) => !!query && !!query.latitude && !!query.longitude

export const getInitialAction = async (req: Request, match: match<{}>, state: IState) => {
  const restaurants = await (hasLocation(req.query)
    ? Restaurants.getList(req.query)
    : Promise.resolve([])
  ).catch((error: Error) => error)
  return fetchRestaurantsReceive(restaurants)
}
