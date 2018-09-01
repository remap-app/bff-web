import { Store } from 'redux'
import { User, UserMetadata } from '@firebase/auth-types'
import { signedIn, IData } from '../../modules/auth'

const createAuthStateChangeHandlerEnhancer = ({ auth }: any) => {
  if (!auth) {
    throw TypeError('`{ auth }` must be a Firebase.Auth')
  }

  return (createStore: (...args: any[]) => Store) => (...args: any[]) => {
    const store = createStore(...args)
    
    auth.onAuthStateChanged((user: User) => {
      if (user) {
        const userData: IData = {
          displayName: user.displayName as string,
          photoURL: user.photoURL as string,
          email: user.email as string,
          emailVerified: user.emailVerified as boolean,
          metadata: user.metadata as UserMetadata,
          uid: user.uid as string,
        }

        store.dispatch(
          signedIn(userData)
        )
      }
    })

    return store
  }
}

export default createAuthStateChangeHandlerEnhancer
