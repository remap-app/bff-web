import { Dispatch } from 'redux'
import actionCreatorFactory, { Action } from 'typescript-fsa'
import { reducerWithInitialState } from 'typescript-fsa-reducers'
import { IQuery as IRestaurantsQuery, IRestaurant } from '../api/restaurants'

const createActionCreator = actionCreatorFactory('remap/restaurants')

export type IData = IRestaurant[]

export interface IState {
  data: IData;
  isRequesting: boolean;
  loaded: boolean;
  error: Error | null;
}

export type Payload = IData | Error

export enum ActionTypes {
  FETCH_RESTAURANTS_REQUEST = 'FETCH_RESTAURANTS/REQUEST',
  FETCH_RESTAURANTS_RECEIVE = 'FETCH_RESTAURANTS/RECEIVE',
  RESET_RESTAURANTS = 'RESET_RESTAURANTS',
}

export const initialState: IState = {
  data: [],
  isRequesting: false,
  loaded: false,
  error: null,
}

export const fetchRestaurantsRequest = createActionCreator(ActionTypes.FETCH_RESTAURANTS_REQUEST)
export const fetchRestaurantsReceive = createActionCreator<Payload>(ActionTypes.FETCH_RESTAURANTS_RECEIVE)
export const resetRestaurants = createActionCreator(ActionTypes.RESET_RESTAURANTS)

export const fetchRestaurants = (query: IRestaurantsQuery) => async (dispatch: Dispatch, _: any, { api }: any) => {
  dispatch(fetchRestaurantsRequest())
  const payload = await api.Restaurants.getList(query).catch((error: Error) => error)
  dispatch(fetchRestaurantsReceive(payload))
}

export const reducer = reducerWithInitialState(initialState)
  .caseWithAction(fetchRestaurantsRequest, (state: IState): IState => {
    return {
      ...state,
      isRequesting: true,
      loaded: false,
    }
  })
  .caseWithAction(fetchRestaurantsReceive, (state: IState, action: Action<IData & Error>): IState => {
    return action.error
      ? {
        ...state,
        isRequesting: false,
        loaded: true,
        error: action.payload,
      }
      : {
        ...state,
        data: action.payload,
        isRequesting: false,
        loaded: true,
        error: null,
      }
  })
  .caseWithAction(resetRestaurants, (): IState => {
    return { ...initialState }
  })
