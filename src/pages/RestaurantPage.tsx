import * as React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import { RestaurantCard } from '../components/RestaurantCard'
import { IData as IRestaurant } from '../modules/restaurant'

export interface IProps {
  restaurant: IRestaurant;
  error?: Error;
  onRetry: () => void;
}

export const RestaurantPage = (props: IProps): JSX.Element => {
  if (props.error) {
    return (
      <Paper>
        <Button onClick={props.onRetry}>Retry</Button>
     </Paper>
    )
  }
  if (!props.restaurant.id) {
    return <CircularProgress />
  }
  return <RestaurantCard restaurant={props.restaurant} />
}
