import { combineReducers } from 'redux'
import { connectRouter, RouterState } from 'connected-react-router'
import { reducer as restaurants, IState as IRestaurantsState } from '../modules/restaurants'
import { reducer as geolocation, IState as IGeolocationState } from '../modules/geolocation'
import history from '../history'

export interface IState {
  router?: RouterState;
  restaurants: IRestaurantsState;
  geolocation: IGeolocationState;
}

const rootReducer = connectRouter(history)(
  combineReducers({
    restaurants,
    geolocation,
  })
)

export default rootReducer
