import { createStore, compose, applyMiddleware } from 'redux'
import { routerMiddleware } from 'connected-react-router'
import logger from 'redux-logger'
import createThunkMiddleware from './middlewares/createThunkMiddleware'
import rootReducer, { IState } from '../reducer'
import history from '../history'
import { geolocationMiddleware } from './middlewares/geolocationMiddleware'
import { mapCoordsToUrlMiddleware } from './middlewares/mapCoordsToUrlMiddleware'

const configureStore = (initialState?: IState) => {
  const store = createStore(
    rootReducer,
    initialState as IState,
    compose(
      applyMiddleware(
        routerMiddleware(history),
        createThunkMiddleware(),
        geolocationMiddleware,
        mapCoordsToUrlMiddleware,
        logger
      )
    )
  )

  if (module.hot) {
    module.hot.accept('../reducer', () => {
      store.replaceReducer(require('../reducer').default) // eslint-disable-line
    })
  }

  return store
}

export default configureStore
