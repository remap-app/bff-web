import * as React from 'react'
import { hydrate } from 'react-dom'
import { Provider as ReduxProvider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import { Root } from '../containers/Root'
import configureStore from '../store/configureStore.dev'
import history from '../history'
import { getInitialState } from './helpers'

const main = () => {
  const initialState = getInitialState()
  const store = configureStore(initialState)
  hydrate(
    <ReduxProvider store={store}>
      <ConnectedRouter history={history}><Root /></ConnectedRouter>
    </ReduxProvider>,
    document.getElementById('app')
  )
}

main()
