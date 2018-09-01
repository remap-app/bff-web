import { combineReducers } from 'redux'
import { connectRouter, RouterState } from 'connected-react-router'
import { reducer as restaurants, IState as IRestaurantsState } from '../modules/restaurants'
import { reducer as restaurant, IState as IRestaurantState } from '../modules/restaurant'
import { reducer as geolocation, IState as IGeolocationState } from '../modules/geolocation'
import { reducer as auth, IState as IAuthState } from '../modules/auth'
import history from '../history'

export interface IState {
  router?: RouterState;
  restaurants: IRestaurantsState;
  restaurant: IRestaurantState;
  geolocation: IGeolocationState;
  auth: IAuthState;
}

const rootReducer = connectRouter(history)(
  combineReducers({
    restaurants,
    restaurant,
    geolocation,
    auth,
  })
)

export default rootReducer
