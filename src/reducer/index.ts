import { combineReducers } from 'redux'
import { reducer as restaurants, IState as IRestaurantsState } from '../modules/restaurants'

export interface IState {
  restaurants: IRestaurantsState;
}

export default combineReducers({
  restaurants,
})
