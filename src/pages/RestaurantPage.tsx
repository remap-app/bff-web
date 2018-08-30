import * as React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import { RestaurantCard } from '../components/RestaurantCard'
import { IData as IRestaurant } from '../modules/restaurant'

export interface IProps {
  restaurant: IRestaurant;
}

export const RestaurantPage = (props: IProps): JSX.Element => {
  if (!props.restaurant.id) {
    return <CircularProgress />
  }
  return <RestaurantCard restaurant={props.restaurant} />
}
