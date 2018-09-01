import * as firebase from 'firebase/app'
import 'firebase/auth'

const config = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
}

if (firebase.apps.length === 0) {
  firebase.initializeApp(config)
}

const auth = firebase.auth()

export default auth
