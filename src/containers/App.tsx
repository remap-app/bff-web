import * as React from 'react'
import { Routes } from '../routes/Routes'

export class App extends React.Component {
  componentDidMount(): void {
    const jssStyles = document.getElementById('jss-server-side')
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles)
    }
  }

  render(): JSX.Element {
    return (
      <div id='app'>
        <Routes />
      </div>
    )
  }
}
