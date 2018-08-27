import { Store, Dispatch } from 'redux'
import { getGeolocationEnd, PositionError, ActionTypes, IPositionOptions, ICoords } from '../../modules/geolocation'

const NOT_SUPPORTED = 0

const navigator = typeof window !== 'undefined' ? window.navigator : null

export const geolocationMiddleware = (store: Store) => (next: Dispatch) => (action: any) => {
  if (action.type !== ActionTypes.GET_GEOLOCATION_BEGIN) {
    return next(action)
  }

  if (!navigator || !navigator.geolocation) {
    return store.dispatch(getGeolocationEnd(new PositionError(NOT_SUPPORTED, 'Not supported')))
  }

  const options: IPositionOptions = action.payload.meta.options

  navigator.geolocation.getCurrentPosition(
    ({ coords }) => {
      const payload: ICoords = {
        latitude: coords.latitude as number,
        longitude: coords.longitude as number,
        altitude: coords.altitude as number | undefined,
        accuracy: coords.accuracy as number,
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
}
