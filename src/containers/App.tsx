import * as React from 'react'
import { withStyle } from 'styledux'
import { withRouter } from 'react-router'
import { Dispatch, bindActionCreators } from 'redux'
import { push } from 'connected-react-router'
import { Location } from 'history'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { Routes } from '../routes/Routes'
import { GlobalHeader } from '../components/GLobalHeader'
import { BottomNav } from '../components/BottomNav'
import { MainLayout } from '../components/MainLayout'
import { IState } from '../reducer'
import { ICoords, getGeolocationBegin } from '../modules/geolocation'
import { signout, IData as IUser } from '../modules/auth'
import * as s from './App.css'

export interface IProps {
  location: Location;
  coords: ICoords;
  signedIn: boolean;
  user: IUser;
  onLocationDetect: () => void;
  onSignin: () => void;
  onSignout: () => void;
}

class _App extends React.Component<IProps> {
  componentDidMount(): void {
    this.removePrerenderdStyles()
  }

  render(): JSX.Element {
    const val: number = /^\/restaurants/.test(this.props.location.pathname)
      ? 0
      : /^\/stocks/.test(this.props.location.pathname)
       ? 1
       : NaN

    return (
      <div id='app'>
        <GlobalHeader
          onLocationDetect={this.props.onLocationDetect}
          onSignin={this.props.onSignin}
          onSignout={this.props.onSignout}
          signedIn={this.props.signedIn}
          user={this.props.user}
        />
        <MainLayout>
          <Routes />
        </MainLayout>
        <BottomNav value={val} location={this.props.location} coords={this.props.coords} />
      </div>
    )
  }

  removePrerenderdStyles(): void {
    const jssStyles = document.getElementById('jss-server-side')
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles)
    }
  }
}

export const App = compose(
  withRouter,
  connect(
    (state: IState) => ({ coords: state.geolocation.coords, user: state.auth.data, signedIn: state.auth.signedIn }),
    (dispatch: Dispatch) => bindActionCreators({
      onLocationDetect: () => getGeolocationBegin(),
      onSignin: () => push('/signin'),
      onSignout: signout,
    }, dispatch)
  ),
  withStyle(s)
)(_App)
