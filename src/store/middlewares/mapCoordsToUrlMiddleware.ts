import { Store, Dispatch } from 'redux'
import { replace } from 'connected-react-router'
import { getGeolocationEnd } from '../../modules/geolocation'

export const mapCoordsToUrlMiddleware = (store: Store) => (next: Dispatch) => (action: any) => {
  if (action.type !== getGeolocationEnd.toString() || action.error) {
    return next(action)
  }

  const { latitude, longitude } = action.payload
  store.dispatch(
    replace({ search: `?latitude=${latitude}&longitude=${longitude}` })
  )

  return next(action)
}
