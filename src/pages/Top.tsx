import { parse as parseQueryString, ParsedUrlQuery } from 'querystring'
import * as React from 'react'
import { Request } from 'express'
import { Dispatch, bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { match, withRouter, RouteProps } from 'react-router'
import { compose } from 'recompose'
import { App } from '../components/App'
import { IState } from '../reducer'
import { Restaurants } from '../api/restaurants'
import { fetchRestaurants, fetchRestaurantsReceive } from '../modules/restaurants'
import { IData as IRestaurants } from '../modules/restaurants'

export interface IProps extends RouteProps {
  restaurants: IRestaurants;
  fetchRestaurants: Function;
}

const hasLocation = (query?: ParsedUrlQuery) => !!query && !!query.latitude && !!query.longitude

class Top extends React.Component<IProps> {
  componentDidMount(): void {
    const { location }: any = this.props
    const query = parseQueryString(location.search.slice(1))
    if (this.props.restaurants.length === 0 && hasLocation(query)) {
      this.props.fetchRestaurants(query)
    }
  }
  render(): JSX.Element {
    return <App restaurants={this.props.restaurants} />
  }
}

export default compose(
  withRouter,
  connect(
    (state: IState) => ({ restaurants: state.restaurants.data as IRestaurants }),
    (dispatch: Dispatch) => bindActionCreators({
      fetchRestaurants,
    }, dispatch)
  )
)(Top)

export const getInitialAction = async (req: Request) => {
  const restaurants = await (hasLocation(req.query)
    ? Restaurants.getList(req.query)
    : Promise.resolve([])
  ).catch((error: Error) => error)
  return fetchRestaurantsReceive(restaurants)
}
