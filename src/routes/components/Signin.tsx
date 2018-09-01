import * as React from 'react'
import NoSsr from '@material-ui/core/NoSsr'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import * as firebase from 'firebase/app'
import auth from '../../auth'

export default class Signin extends React.Component {
  private config = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
    signInSuccessUrl: '/',
    // We will display Google and Facebook as auth providers.
    signInOptions: [
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
      signInSuccessWithAuthResult: (authResult: any, redirectUrl: any) => {
        console.log('authResult', authResult)
        console.log('redirectUrl', redirectUrl)
      },
      signInFailure: (error: Error) => console.log('signInFailure error', error),
      uiShown: () => console.log('uiShown'),
    },
    privacyPolicyUrl: 'https://sugarshin.net/remap-privacy',
  }

  unregisterAuthObserver: Function

  componentDidMount() {
    const currentUser = auth.currentUser
    console.log('currentUser', currentUser)
    this.unregisterAuthObserver = auth.onAuthStateChanged(user => {
      console.log('onAuthStateChanged user', user)
      const u: any = currentUser || user
      if (u) {
        u.getIdToken(/* forceRefresh */ true).then((idToken: string) => {
          console.log('idToken', idToken);
          // Send token to your backend via HTTPS
          // ...
        }).catch((error: Error) => {
          console.log('getIdToken error', error)
          // Handle error
        })
      }
    })
  }
  render(): JSX.Element {
    return <NoSsr>
      <StyledFirebaseAuth
        uiConfig={this.config}
        firebaseAuth={auth}
        uiCallback={(ui: any) => {
          console.log('ui', ui)
        }}
      />
    </NoSsr>
  }
}
