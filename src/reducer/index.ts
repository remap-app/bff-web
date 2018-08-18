import { combineReducers } from 'redux'
import { connectRouter, RouterState } from 'connected-react-router'
import { reducer as restaurants, IState as IRestaurantsState } from '../modules/restaurants'
import history from '../history'

export interface IState {
  router: RouterState;
  restaurants: IRestaurantsState;
}

export default connectRouter(history)(
  combineReducers({
    restaurants,
  })
)
