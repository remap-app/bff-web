import actionCreatorFactory, { Action } from 'typescript-fsa'
import { reducerWithInitialState } from 'typescript-fsa-reducers'
import { Dispatch } from 'redux'
import { UserMetadata } from '@firebase/auth-types'

const createActionCreator = actionCreatorFactory('remap/auth')

export interface IData {
  displayName?: string;
  email?: string;
  emailVerified: boolean;
  metadata: UserMetadata;
  phoneNumber?: string;
  photoURL?: string;
  uid: string;
}

export interface IState {
  data: IData | {};
  signedIn: boolean;
  isLoading: boolean;
  error?: Error | null;
}

export enum ActionTypes {
  SIGNED_IN = 'SIGNED_IN',
  SIGNOUT_BEGIN = 'SIGNOUT/BEGIN',
  SIGNOUT_END = 'SIGNOUT/END',
}

export const initialState: IState = {
  data: {},
  signedIn: false,
  isLoading: false,
  error: null,
}

export const signedIn = createActionCreator<IData>(ActionTypes.SIGNED_IN)

export const signoutBegin = createActionCreator(ActionTypes.SIGNOUT_BEGIN)
export const signoutEnd = createActionCreator(ActionTypes.SIGNOUT_END)
export const signout = () => async (dispatch: Dispatch, _: any, { auth }: any) => {
  dispatch(signoutBegin())
  await auth.signOut()
  dispatch(signoutEnd())
}

export const reducer = reducerWithInitialState(initialState)
  .caseWithAction(signedIn, (state: IState, action: Action<any>): IState => {
    return {
      ...state,
      data: action.payload,
      signedIn: true,
      isLoading: false,
      error: null,
    }
  })
  .caseWithAction(signoutBegin, (state: IState): IState => {
    return {
      ...state,
      isLoading: true,
    }
  })
  .caseWithAction(signoutEnd, (state: IState): IState => {
    return {
      ...state,
      data: {},
      signedIn: false,
      isLoading: false,
      error: null,
    }
  })
