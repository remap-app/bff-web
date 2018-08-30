import { Dispatch } from 'redux'
import actionCreatorFactory, { Action } from 'typescript-fsa'
import { reducerWithInitialState } from 'typescript-fsa-reducers'
import { IQuery as IRestaurantsQuery, IRestaurant } from '../api/restaurants'
import { FormLabel } from '@material-ui/core';

const createActionCreator = actionCreatorFactory('remap/restaurant')

export type IData = IRestaurant

export interface IState {
  data: IData | {};
  isRequesting: boolean;
  loaded: boolean;
  error: Error | null;
}

export type Payload = IData | Error

export enum ActionTypes {
  FETCH_RESTAURANT_REQUEST = 'FETCH_RESTAURANT/REQUEST',
  FETCH_RESTAURANT_RECEIVE = 'FETCH_RESTAURANT/RECEIVE',
  REST_RESTRANT = 'REST_RESTRANT',
}

export const initialState: IState = {
  data: {},
  isRequesting: false,
  loaded: false,
  error: null,
}

export const fetchRestaurantRequest = createActionCreator(ActionTypes.FETCH_RESTAURANT_REQUEST)
export const fetchRestaurantReceive = createActionCreator<Payload>(ActionTypes.FETCH_RESTAURANT_RECEIVE)
export const resetRestaurant = createActionCreator(ActionTypes.REST_RESTRANT)

export const fetchRestaurant = (id: string) => async (dispatch: Dispatch, _: any, { api }: any) => {
  dispatch(fetchRestaurantRequest())
  const payload = await api.Restaurants.getById(id).catch((error: Error) => error)
  dispatch(fetchRestaurantReceive(payload))
}

export const reducer = reducerWithInitialState(initialState)
  .caseWithAction(fetchRestaurantRequest, (state: IState): IState => {
    return {
      ...state,
      isRequesting: true,
    }
  })
  .caseWithAction(fetchRestaurantReceive, (state: IState, action: Action<any>): IState => {
    return action.error
      ? {
        ...state,
        isRequesting: false,
        error: action.payload,
        loaded: true,
      }
      : {
        ...state,
        data: action.payload,
        isRequesting: false,
        error: null,
        loaded: true,
      }
  })
  .caseWithAction(resetRestaurant, (): IState => {
    return { ...initialState }
  })
