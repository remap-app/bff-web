import * as React from 'react'
import { hydrate } from 'react-dom'
import { createStyleduxStore, handleStateChangeOnClient } from 'styledux'
import { createMuiTheme } from '@material-ui/core/styles'
import { ConnectedRouter } from 'connected-react-router'
import { Root } from '../containers/Root'
import { App } from '../containers/App'
import configureStore from '../store/configureStore.dev'
import history from '../history'
import { getInitialState } from './helpers'
import { theme } from '../style/theme'

const main = () => {
  const initialState = getInitialState()
  const store = configureStore(initialState)
  const muiTheme = createMuiTheme(theme)

  hydrate(
    <Root
      reduxStore={store}
      styleduxStore={createStyleduxStore(handleStateChangeOnClient({ insertAt: '#main-css' }))}
      theme={muiTheme}
    >
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </Root>,
    document.getElementById('root')
  )
}

main()
