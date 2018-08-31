import { Store, Dispatch } from 'redux'
import { getGeolocationBegin, getGeolocationEnd, PositionError, IPositionOptions, ICoords } from '../../modules/geolocation'

const NOT_SUPPORTED = 0

const navigator = typeof window !== 'undefined' ? window.navigator : null

export const geolocationMiddleware = (store: Store) => (next: Dispatch) => (action: any) => {
  if (action.type !== getGeolocationBegin.toString()) {
    return next(action)
  }

  if (!navigator || !navigator.geolocation) {
    return store.dispatch(getGeolocationEnd(new PositionError(NOT_SUPPORTED, 'Not supported')))
  }

  const meta = action.meta || {}
  const options: IPositionOptions = meta.options || { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }

  navigator.geolocation.getCurrentPosition(
    ({ coords }) => {
      const payload: ICoords = {
        latitude: coords.latitude,
        longitude: coords.longitude,
        altitude: coords.altitude as number | undefined,
        accuracy: coords.accuracy,
        altitudeAccuracy: coords.altitudeAccuracy as number | undefined,
        heading: coords.heading as number | undefined,
        speed: coords.speed as number | undefined,
      }

      return store.dispatch(getGeolocationEnd(payload))
    },
    error => {
      return store.dispatch(
        getGeolocationEnd(
          new PositionError(error.code, error.message)
        )
      )
    },
    options
  )

  return next(action)
}
