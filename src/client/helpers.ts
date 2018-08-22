import { IState } from '../reducer'

declare var window: { __INITIAL_STATE__: IState };

export const getInitialState = () => {
  const initialState = window.__INITIAL_STATE__
  delete window.__INITIAL_STATE__
  return initialState
}
