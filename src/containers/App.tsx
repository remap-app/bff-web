import * as React from 'react'
import { withStyle } from 'styledux'
import { withRouter } from 'react-router'
import { Location } from 'history'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { Routes } from '../routes/Routes'
import { BottomNav } from '../components/BottomNav'
import { IState } from '../reducer'
import { ICoords } from '../modules/geolocation'
import * as s from './App.css'

export interface IProps {
  location: Location;
  coords: ICoords;
}

class _App extends React.Component<IProps> {
  componentDidMount(): void {
    const jssStyles = document.getElementById('jss-server-side')
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles)
    }
  }

  render(): JSX.Element {
    const val: number = /^\/restaurants/.test(this.props.location.pathname)
      ? 0
      : /^\/stocks/.test(this.props.location.pathname)
       ? 1
       : NaN

    return (
      <div id='app'>
        <Routes />
        <BottomNav value={val} location={this.props.location} coords={this.props.coords} />
      </div>
    )
  }
}

export const App = compose(
  withRouter,
  connect(
    (state: IState) => {
      const { coords } = state.geolocation
      return { coords }
    }
  ),
  withStyle(s)
)(_App)
