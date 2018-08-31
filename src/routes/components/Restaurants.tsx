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
import { fetchRestaurants, fetchRestaurantsReceive, Payload as FetchRestaurantsPayload, IData as IRestaurants } from '../../modules/restaurants'
import { getGeolocationEnd, ICoords, PositionError } from '../../modules/geolocation'
import { IRouteContext } from '../'

export interface IProps extends RouteComponentProps<void> {
  route?: RouteConfig;
  restaurants: IRestaurants;
  coords: ICoords;
  location: Location;
  fetchRestaurants: Function;
  resetRestaurants: Function;
  positionError?: PositionError;
}

export class RestaurantsRoute extends React.Component<IProps> {
  private static hasLocation = (query?: ParsedUrlQuery) => !!query && !!query.latitude && !!query.longitude

  private static fetchRestaurants = async (query: ParsedUrlQuery): Promise<FetchRestaurantsPayload> => {
    const promise = RestaurantsRoute.hasLocation(query)
      ? Restaurants.getList(query as IRestaurantsQuery)
      : Promise.resolve([])
    return await promise.catch((error: Error) => error)
  }

  public static getInitialAction = async ({ query }: IRouteContext) => {
    const restaurants: FetchRestaurantsPayload = await RestaurantsRoute.fetchRestaurants(query)
    const actions: Action[] = [fetchRestaurantsReceive(restaurants)]

    if (RestaurantsRoute.hasLocation(query)) {
      const latitude: number = toNumber(query.latitude)
      const longitude: number = toNumber(query.longitude)
      if (!_isNaN(latitude) && !_isNaN(longitude)) {
        actions.push(
          getGeolocationEnd({ latitude, longitude, accuracy: 0 })
        )
      }
    }
    return actions
  }

  componentDidUpdate(prevProps: IProps): void {
    console.log('this.props.location', this.props.location)
    console.log('prevProps.location', prevProps.location)
    if (this.props.location.search !== prevProps.location.search) {
      const parsedQuery: ParsedUrlQuery = parseQueryString(this.props.location.search.slice(1))
      console.log('parsedQuery', parsedQuery)
      if (RestaurantsRoute.hasLocation(parsedQuery)) {
        this.props.fetchRestaurants(parsedQuery)
      } else {
        this.props.resetRestaurants()
      }
    }
  }

  render(): JSX.Element {
    return <RestaurantsPage restaurants={this.props.restaurants} coords={this.props.coords} positionError={this.props.positionError} />
  }
}

export default connect(
  (state: IState) => ({
    restaurants: state.restaurants.data as IRestaurants,
    coords: state.geolocation.coords as ICoords,
    positionError: state.geolocation.error as PositionError,
  }),
  (dispatch: Dispatch) => bindActionCreators({
    fetchRestaurants,
    resetRestaurants: () => fetchRestaurantsReceive([]),
  }, dispatch)
)(RestaurantsRoute)
