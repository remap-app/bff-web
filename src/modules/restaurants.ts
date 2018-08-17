import { Dispatch, Store } from 'redux'
import actionCreatorFactory, { Action } from 'typescript-fsa'
import { reducerWithInitialState } from 'typescript-fsa-reducers'
import { IQuery } from '../api/restaurants'

const createActionCreator = actionCreatorFactory('remap/restaurants')

export interface IState {
  data: IData;
  isRequesting: boolean;
  error: Error | null;
}
export type IData = {}[] // tmp
export enum ActionTypes {
  FETCH_RESTAURANTS_REQUEST = 'FETCH_RESTAURANTS/REQUEST',
  FETCH_RESTAURANTS_RECEIVE = 'FETCH_RESTAURANTS/RECEIVE',
}
export type Payload = IData | Error
export const initialState: IState = {
  data: [],
  isRequesting: false,
  error: null,
}

export const fetchRestaurantsRequest = createActionCreator(ActionTypes.FETCH_RESTAURANTS_REQUEST)
export const fetchRestaurantsReceive = createActionCreator<IData>(ActionTypes.FETCH_RESTAURANTS_RECEIVE)
export const fetchRestaurants = (query: IQuery) => async (dispatch: Dispatch, getState: Store['getState'], { api }: any) => {
  dispatch(fetchRestaurantsRequest())
  const payload = await api.getList(query).catch((error: Error) => error)
  dispatch(fetchRestaurantsReceive(payload))
}
export const reducer = reducerWithInitialState(initialState)
  .caseWithAction(fetchRestaurantsRequest, (state: IState): IState => {
    return {
      ...state,
      isRequesting: true,
    }
  })
  .caseWithAction(fetchRestaurantsReceive, (state: IState, action: any): IState => {
    const next = { ...state }
    return action.error
      ? {
        data: state.data,
        isRequesting: false,
        error: action.payload,
      }
      : {
        data: action.payload,
        isRequesting: false,
        error: null,
      }
  })