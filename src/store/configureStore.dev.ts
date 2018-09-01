import { createStore, compose, applyMiddleware } from 'redux'
import { routerMiddleware } from 'connected-react-router'
import logger from 'redux-logger'
import createThunkMiddleware from './middlewares/createThunkMiddleware'
import rootReducer, { IState } from '../reducer'
import history from '../history'
import auth from '../auth'
import createAuthStateChangeHandlerEnhancer from './enhancers/createAuthStateChangeHandlerEnhancer'
import { geolocationMiddleware } from './middlewares/geolocationMiddleware'
import { mapCoordsToUrlMiddleware } from './middlewares/mapCoordsToUrlMiddleware'
import { handleAuthStateChangedHandlerMiddleware } from './middlewares/handleAuthStateChangedHandlerMiddleware'

const configureStore = (initialState?: IState) => {
  const enhancer: any = compose( // TODO
    createAuthStateChangeHandlerEnhancer({ auth }),
    applyMiddleware(
      routerMiddleware(history),
      createThunkMiddleware(),
      geolocationMiddleware,
      mapCoordsToUrlMiddleware,
      handleAuthStateChangedHandlerMiddleware,
      logger
    )
  )

  const store = createStore(
    rootReducer,
    initialState as IState,
    enhancer
  )

  if (module.hot) {
    module.hot.accept('../reducer', () => {
      store.replaceReducer(require('../reducer').default) // eslint-disable-line
    })
  }

  return store
}

export default configureStore
