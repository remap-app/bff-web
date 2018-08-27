import { createStore, compose, applyMiddleware } from 'redux'
import { routerMiddleware } from 'connected-react-router'
import createThunkMiddleware from './middlewares/createThunkMiddleware'
import rootReducer, { IState } from '../reducer'
import history from '../history'
import { geolocationMiddleware } from './middlewares/geolocationMiddleware';

const configureStore = (initialState?: IState) => {
  const store = createStore(
    rootReducer,
    initialState as IState,
    compose(
      applyMiddleware(
        routerMiddleware(history),
        createThunkMiddleware(),
        geolocationMiddleware
      )
    )
  )

  if (module.hot) {
    module.hot.accept('../reducer', () => {
      store.replaceReducer(require('../reducer').default)
    })
  }

  return store
}

export default configureStore
