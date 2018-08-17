import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider as ReduxProvider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import { createBrowserHistory } from 'history'
import { Routes } from '../routes/Routes'
import configureStore from '../store/configureStore.dev'
import { getInitialState } from './helpers'

const main = () => {
  const initialState = getInitialState()
  const { store, history } = configureStore(initialState, createBrowserHistory())
  ReactDOM.hydrate(
    <ReduxProvider store={store}>
      <ConnectedRouter history={history}><Routes /></ConnectedRouter>
    </ReduxProvider>,
    document.getElementById('app')
  )
}

main()
