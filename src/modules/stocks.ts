import { Dispatch } from 'redux'
import actionCreatorFactory, { Action } from 'typescript-fsa'
import { reducerWithInitialState } from 'typescript-fsa-reducers'
import { IQuery as IStocksQuery, IStock } from '../api/stocks'
import { IRestaurant, Restaurants } from '../api/restaurants'

const createActionCreator = actionCreatorFactory('remap/stocks')

export type IData = IRestaurant[]

export interface IState {
  data: IData;
  isRequesting: boolean;
  loaded: boolean;
  error: Error | null;
}

export type Payload = IData | Error

export enum ActionTypes {
  CREATE_STOCK_REQUEST = 'CREATE_STOCK/REQUEST',
  CREATE_STOCK_RECEIVE = 'CREATE_STOCK/RECEIVE',
  FETCH_STOCKS_REQUEST = 'FETCH_STOCKS/REQUEST',
  FETCH_STOCKS_RECEIVE = 'FETCH_STOCKS/RECEIVE',
  DELETE_STOCK_REQUEST = 'DELETE_STOCK/REQUEST',
  DELETE_STOCK_RECEIVE = 'DELETE_STOCK/RECEIVE',
  RESET_STOCKS = 'RESET_STOCKS',
}

export const initialState: IState = {
  data: [],
  isRequesting: false,
  loaded: false,
  error: null,
}

export const fetchStocksRequest = createActionCreator(ActionTypes.FETCH_STOCKS_REQUEST)
export const fetchStocksReceive = createActionCreator<Payload>(ActionTypes.FETCH_STOCKS_RECEIVE)

export const fetchStocks = (query: IStocksQuery) => async (dispatch: Dispatch, _: any, { api, cookies }: any/* TODO */) => {
  dispatch(fetchStocksRequest())

  const stocks: IStock[] = await api.Stocks.getList(query, cookies.get('__t')).catch((error: Error) => error)
  if (stocks instanceof Error) {
    dispatch(fetchStocksReceive(stocks))
    return
  }

  const id: string = stocks.map((s: IStock) => s.id).join(',')
  const payload = await (id ? api.Restaurants.getList({ id }).catch((error: Error) => error) : Promise.resolve([]))
  dispatch(fetchStocksReceive(payload))
}

export const createStockRequest = createActionCreator(ActionTypes.CREATE_STOCK_REQUEST)
export const createStockReceive = createActionCreator<any/* TODO */>(ActionTypes.CREATE_STOCK_RECEIVE)

export const createStock = (restaurantId: string) => async (dispatch: Dispatch, _: any, { api, cookies }: any/* TODO */) => {
  dispatch(createStockRequest())
  const maybeError = await api.Stocks.create(restaurantId, cookies.get('__t')).catch((error: Error) => error)
  if (maybeError instanceof Error) {
    dispatch(createStockReceive(maybeError))
    return
  }
  const restaurant: IRestaurant = await Restaurants.getById(restaurantId)
  dispatch(createStockReceive(restaurant))
}

export const deleteStockRequest = createActionCreator(ActionTypes.DELETE_STOCK_REQUEST)
export const deleteStockReceive = createActionCreator<any/* TODO */>(ActionTypes.DELETE_STOCK_RECEIVE)

export const deleteStock = (restaurantId: string) => async (dispatch: Dispatch, _: any, { api, cookies }: any/* TODO */) => {
  dispatch(deleteStockRequest())
  const payload = await api.Stocks.deleteById(restaurantId, cookies.get('__t')).then(() => restaurantId).catch((error: Error) => error)
  dispatch(createStockReceive(payload))
}

export const resetStocks = createActionCreator(ActionTypes.RESET_STOCKS)

export const reducer = reducerWithInitialState(initialState)
  .caseWithAction(createStockRequest, (state: IState): IState => {
    return {
      ...state,
      isRequesting: true,
    }
  })
  .caseWithAction(createStockReceive, (state: IState, action: Action<any/* TODO */>): IState => {
    return action.error
      ? {
        ...state,
        isRequesting: false,
        error: action.payload,
      }
      : {
        ...state,
        isRequesting: false,
        data: [action.payload, ...state.data],
        error: null,
      }
  })
  .caseWithAction(fetchStocksRequest, (state: IState): IState => {
    return {
      ...state,
      isRequesting: true,
      loaded: false,
    }
  })
  .caseWithAction(fetchStocksReceive, (state: IState, action: Action<any/* TODO */>): IState => {
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
  .caseWithAction(deleteStockRequest, (state: IState): IState => {
    return {
      ...state,
      isRequesting: true,
    }
  })
  .caseWithAction(deleteStockReceive, (state: IState, action: Action<any/* TODO */>): IState => {
    return action.error
      ? {
        ...state,
        isRequesting: false,
        error: action.payload,
      }
      : {
        ...state,
        isRequesting: false,
        data: state.data.filter((r: IRestaurant) => r.id !== action.payload),
        error: null,
      }
  })
  .caseWithAction(resetStocks, (): IState => {
    return { ...initialState }
  })
