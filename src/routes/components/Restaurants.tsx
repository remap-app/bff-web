import { parse as parseQueryString, ParsedUrlQuery } from 'querystring'
import * as React from 'react'
import { Dispatch, bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router-dom'
import { RouteConfig } from 'react-router-config'
import { RestaurantsPage } from '../../pages/RestaurantsPage'
import { Restaurants, IQuery as IRestaurantsQuery } from '../../api/restaurants'
import { IState } from '../../reducer'
import { fetchRestaurants, fetchRestaurantsReceive, Payload as FetchRestaurantsPayload, IData as IRestaurants } from '../../modules/restaurants'
import { IRouteContext } from '../'

export interface IProps extends RouteComponentProps<void> {
  route?: RouteConfig;
  restaurants: IRestaurants;
  fetchRestaurants: Function;
  resetRestaurants: Function;
}

export class RestaurantsRoute extends React.Component<IProps> {
  private static hasLocation = (query?: ParsedUrlQuery) => !!query && !!query.latitude && !!query.longitude

  private static fetchRestaurants = async (query: IRestaurantsQuery): Promise<FetchRestaurantsPayload> => {
    const promise = RestaurantsRoute.hasLocation(query)
      ? Restaurants.getList(query)
      : Promise.resolve([])
    return await promise.catch((error: Error) => error)
  }

  public static getInitialAction = async ({ query }: IRouteContext) => {
    const q: any = query // TODO
    const restaurants: FetchRestaurantsPayload = await RestaurantsRoute.fetchRestaurants(q)
    return fetchRestaurantsReceive(restaurants)
  }

  componentDidUpdate(prevProps: IProps): void {
    if (this.props.location.search !== prevProps.location.search) {
      const parsedQuery: ParsedUrlQuery = parseQueryString(this.props.location.search.slice(1))
      if (RestaurantsRoute.hasLocation(parsedQuery)) {
        this.props.fetchRestaurants(parsedQuery)
      } else {
        this.props.resetRestaurants()
      }
    }
  }

  render(): JSX.Element {
    return <RestaurantsPage restaurants={this.props.restaurants} />
  }
}

export default connect(
  (state: IState) => ({ restaurants: state.restaurants.data as IRestaurants }),
  (dispatch: Dispatch) => bindActionCreators({
    fetchRestaurants,
    resetRestaurants: () => fetchRestaurantsReceive([]),
  }, dispatch)
)(RestaurantsRoute)
