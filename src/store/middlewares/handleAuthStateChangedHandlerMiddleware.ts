import { Store, Dispatch } from 'redux'
import { signedIn, signoutEnd } from '../../modules/auth'
import cookies from '../../cookies'
import auth from '../../auth'

const TOKEN_KEY = '__t'
const opts = { path: '/', domain: process.env.APP_DOMAIN, secure: process.env.NODE_ENV === 'production' }

export const handleAuthStateChangedHandlerMiddleware = (store: Store) => (next: Dispatch) => (action: any) => {
  if (action.type === signedIn.toString()) {
    if (auth.currentUser) {
      auth.currentUser.getIdToken().then((idToken: string) => {
        cookies.set(TOKEN_KEY, idToken, opts)
      })
    }
  }

  if (action.type === signoutEnd.toString()) {
    cookies.remove(TOKEN_KEY, opts)
  }

  return next(action)
}
