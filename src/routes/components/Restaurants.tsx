import { parse as parseQueryString, ParsedUrlQuery } from 'querystring'
import * as React from 'react'
import { Dispatch, bindActionCreators, Action } from 'redux'
import { connect } from 'react-redux'
import { Location } from 'history';
import { RouteComponentProps } from 'react-router-dom'
import { RouteConfig } from 'react-router-config'
import { toNumber, isNaN as _isNaN } from 'lodash'
import { RestaurantsPage } from '../../pages/RestaurantsPage'
import { Restaurants, IQuery as IRestaurantsQuery } from '../../api/restaurants'
import { IState } from '../../reducer'
import { fetchRestaurants, fetchRestaurantsReceive, resetRestaurants, Payload as FetchRestaurantsPayload, IData as IRestaurants } from '../../modules/restaurants'
import { getGeolocationEnd, PositionError } from '../../modules/geolocation'
import { IRouteContext } from '../'

export interface IProps extends RouteComponentProps<void> {
  route?: RouteConfig;
  restaurants: IRestaurants;
  location: Location;
  loaded: boolean;
  fetchRestaurants: Function;
  resetRestaurants: Function;
  positionError?: PositionError;
}

export class RestaurantsRoute extends React.Component<IProps> {
  private static hasLocation = (query?: ParsedUrlQuery) => !!query && !!query.latitude && !!query.longitude

  public static getInitialAction = async ({ query }: IRouteContext) => {
    if (!RestaurantsRoute.hasLocation(query)) {
      return null
    }
    const restaurants: FetchRestaurantsPayload = await Restaurants.getList(query as IRestaurantsQuery).catch((error: Error) => error)
    const actions: Action[] = [fetchRestaurantsReceive(restaurants)]

    const latitude: number = toNumber(query.latitude)
    const longitude: number = toNumber(query.longitude)
    if (!_isNaN(latitude) && !_isNaN(longitude)) {
      actions.push(
        getGeolocationEnd({ latitude, longitude, accuracy: 0 })
      )
    }

    return actions
  }

  componentDidMount(): void {
    if (this.props.loaded === false) {
      const parsedQuery: ParsedUrlQuery = parseQueryString(this.props.location.search.slice(1))
      if (RestaurantsRoute.hasLocation(parsedQuery)) {
        this.props.fetchRestaurants(parsedQuery)
      }
    }
  }

  componentDidUpdate(prevProps: IProps): void {
    if (this.props.location.search !== prevProps.location.search) {
      const parsedQuery: ParsedUrlQuery = parseQueryString(this.props.location.search.slice(1))
      if (RestaurantsRoute.hasLocation(parsedQuery)) {
        this.props.fetchRestaurants(parsedQuery)
      }
    }
  }

  componentWillUnmount(): void {
    if (this.props.loaded === false) {
      this.props.resetRestaurants()
    }
  }

  render(): JSX.Element {
    return (
      <RestaurantsPage
        restaurants={this.props.restaurants}
        positionError={this.props.positionError}
        restaurantsLoaded={this.props.loaded}
      />
    )
  }
}

export default connect(
  (state: IState) => ({
    restaurants: state.restaurants.data as IRestaurants,
    loaded: state.restaurants.loaded,
    positionError: state.geolocation.error as PositionError,
  }),
  (dispatch: Dispatch) => bindActionCreators({
    fetchRestaurants,
    resetRestaurants,
  }, dispatch)
)(RestaurantsRoute)
