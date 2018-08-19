import { Dispatch, Store } from 'redux'
import actionCreatorFactory, { Action } from 'typescript-fsa'
import { reducerWithInitialState } from 'typescript-fsa-reducers'
import { IQuery as IRestaurantsQuery, IRestaurant } from '../api/restaurants'

const createActionCreator = actionCreatorFactory('remap/restaurants')

export type IData = IRestaurant[]
export interface IState {
  data: IData;
  isRequesting: boolean;
  error: Error | null;
}
type Payload = IData | Error
export enum ActionTypes {
  FETCH_RESTAURANTS_REQUEST = 'FETCH_RESTAURANTS/REQUEST',
  FETCH_RESTAURANTS_RECEIVE = 'FETCH_RESTAURANTS/RECEIVE',
}

export const initialState: IState = {
  data: [],
  isRequesting: false,
  error: null,
}

export const fetchRestaurantsRequest = createActionCreator(ActionTypes.FETCH_RESTAURANTS_REQUEST)
export const fetchRestaurantsReceive = createActionCreator<Payload>(ActionTypes.FETCH_RESTAURANTS_RECEIVE)

export const fetchRestaurants = (query: IRestaurantsQuery) => async (dispatch: Dispatch, getState: Store['getState'], { api }: any) => {
  dispatch(fetchRestaurantsRequest())
  const payload = await api.Restaurants.getList(query).catch((error: Error) => error)
  dispatch(fetchRestaurantsReceive(payload))
}

export const reducer = reducerWithInitialState(initialState)
  .caseWithAction(fetchRestaurantsRequest, (state: IState): IState => {
    return {
      ...state,
      isRequesting: true,
    }
  })
  .caseWithAction(fetchRestaurantsReceive, (state: IState, action: Action<any>): IState => {
    return action.error
      ? {
        ...state,
        isRequesting: false,
        error: action.payload,
      }
      : {
        ...state,
        data: action.payload,
        isRequesting: false,
        error: null,
      };
  })
