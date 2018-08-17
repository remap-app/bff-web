import { createStore, compose, applyMiddleware } from 'redux'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import { History } from 'history'
import createThunkMiddleware from './middlewares/createThunkMiddleware'
import rootReducer from '../reducer'

const configureStore = (initialState: any, history: History) => {
  const store = createStore(
    connectRouter(history)(rootReducer),
    initialState,
    compose(
      applyMiddleware(
        routerMiddleware(history),
        createThunkMiddleware()
      )
    )
  )

  if (module.hot) {
    module.hot.accept('../reducer', () => {
      store.replaceReducer(require('../reducer').default)
    })
  }

  return { store, history }
}

export default configureStore