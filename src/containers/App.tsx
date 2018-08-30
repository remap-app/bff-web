import * as React from 'react'
import { withStyle } from 'styledux'
import { Location } from 'history'
import { connect } from 'react-redux'
import { Routes } from '../routes/Routes'
import { BottomNav } from '../components/BottomNav'
import { compose } from 'recompose'
import { withRouter } from 'react-router';
import { IState } from '../reducer'
import * as s from './App.css'

export interface IProps {
  location: Location;
  queryString: string;
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
        <BottomNav value={val} location={this.props.location} queryString={this.props.queryString} />
      </div>
    )
  }
}

export const App = compose(
  withRouter,
  connect(
    (state: IState) => {
      const { coords } = state.geolocation
      return {
        queryString: coords
          ? `?latitude=${coords.latitude}&longitude=${coords.longitude}`
          : '',
      }
    }
  ),
  withStyle(s)
)(_App)
