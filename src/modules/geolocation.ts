import actionCreatorFactory, { Action } from 'typescript-fsa'
import { reducerWithInitialState } from 'typescript-fsa-reducers'

const createActionCreator = actionCreatorFactory('remap/geolocation')

export interface ICoords {
  latitude: number;
  longitude: number;
  altitude?: number;
  accuracy: number;
  altitudeAccuracy?: number;
  heading?: number;
  speed?: number;
}

export interface IPositionOptions {
  enableHighAccuracy: boolean;
  timeout: number;
  maximumAge: number;
}

export class PositionError extends Error {
  public readonly name: 'PositionError'
  constructor(
    public code: number,
    public message: string
  ) {
    super(message)
    Object.setPrototypeOf(this, PositionError.prototype)
  }
}

export interface IState {
  coords?: ICoords | null;
  isLoading: boolean;
  error?: PositionError | null;
}

type Payload = ICoords | Error

export enum ActionTypes {
  GET_GEOLOCATION_BEGIN = 'GET_GEOLOCATION/BEGIN',
  GET_GEOLOCATION_END = 'GET_GEOLOCATION/END',
}

export const initialState: IState = {
  coords: null,
  isLoading: false,
  error: null,
}

export const getGeolocationBegin = createActionCreator(ActionTypes.GET_GEOLOCATION_BEGIN)
export const getGeolocationEnd = createActionCreator<Payload>(ActionTypes.GET_GEOLOCATION_END)

export const reducer = reducerWithInitialState(initialState)
  .caseWithAction(getGeolocationBegin, (state: IState): IState => {
    return {
      ...state,
      isLoading: true,
    }
  })
  .caseWithAction(getGeolocationEnd, (state: IState, action: Action<any>): IState => {
    return action.error
      ? {
        ...state,
        isLoading: false,
        error: action.payload,
      }
      : {
        ...state,
        coords: action.payload,
        isLoading: false,
        error: null,
      };
  })
