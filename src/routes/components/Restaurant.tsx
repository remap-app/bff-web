import * as React from 'react'
import { Dispatch, bindActionCreators, Action } from 'redux'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router-dom'
import { RouteConfig } from 'react-router-config'
import { RestaurantPage } from '../../pages/RestaurantPage'
import { Restaurants } from '../../api/restaurants'
import { IState } from '../../reducer'
import { fetchRestaurant, resetRestaurant, fetchRestaurantReceive, Payload as FetchRestaurantPayload, IData as IRestaurant } from '../../modules/restaurant'
import { IRouteContext } from '../'

export interface IProps extends RouteComponentProps<{ id: string }> {
  route?: RouteConfig;
  restaurant: IRestaurant;
  loaded: boolean;
  error?: Error;
  fetchRestaurant: Function;
  resetRestaurant: Function;
  restRestaurant: Function;
}

export class RestaurantRoute extends React.Component<IProps> {
  private static fetchRestaurant = async (id: string): Promise<FetchRestaurantPayload> => {
    const promise = Restaurants.getById(id)
    return await promise.catch((error: Error) => error)
  }

  public static getInitialAction = async ({ params }: IRouteContext) => {
    const restaurant: FetchRestaurantPayload = await RestaurantRoute.fetchRestaurant(params.id)
    const action: Action = fetchRestaurantReceive(restaurant)
    return action
  }

  componentDidMount(): void {
    if (this.props.loaded === false) {
      this.props.fetchRestaurant(this.props.match.params.id)
    }
  }
  componentDidUpdate(prevProps: IProps): void {
    if (this.props.match.params.id !== prevProps.match.params.id) {
      this.props.fetchRestaurant(this.props.match.params.id)
    }
  }

  componentWillUnmount(): void {
    this.props.resetRestaurant()
  }

  render(): JSX.Element {
    return <RestaurantPage restaurant={this.props.restaurant} error={this.props.error} onRetry={this.handleRetry} />
  }

  handleRetry = (): void => {
    this.props.fetchRestaurant(this.props.match.params.id)
  }
}

export default connect(
  (state: IState) => ({
    restaurant: state.restaurant.data as IRestaurant,
    loaded: state.restaurant.loaded as boolean,
    error: state.restaurant.error as Error,
  }),
  (dispatch: Dispatch) => bindActionCreators({
    fetchRestaurant,
    resetRestaurant,
  }, dispatch)
)(RestaurantRoute)
