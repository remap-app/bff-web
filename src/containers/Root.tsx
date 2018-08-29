import * as React from 'react'
import { Provider as ReduxProvider } from 'react-redux'
import { StyleduxProvider } from 'styledux'
import { MuiThemeProvider } from '@material-ui/core/styles'
import { hot } from 'react-hot-loader'

export interface IProps {
  reduxStore: any;
  styleduxStore: any;
  children: any;
  theme: any;
  sheetsManager?: any;
}

export const Root = hot(module)(({
  children,
  reduxStore,
  styleduxStore,
  theme,
  sheetsManager,
}: IProps) => {
  return (
    <ReduxProvider store={reduxStore}>
      <StyleduxProvider store={styleduxStore}>
        <MuiThemeProvider theme={theme} sheetsManager={sheetsManager}>
          {children}
        </MuiThemeProvider>
      </StyleduxProvider>
    </ReduxProvider>
  )
})
