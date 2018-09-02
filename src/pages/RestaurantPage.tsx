import * as React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { GridVerticalCenter } from '../components/GridVerticalCenter'
import { RestaurantCard } from '../components/RestaurantCard'
import { IData as IRestaurant } from '../modules/restaurant'

export interface IProps {
  restaurant: IRestaurant;
  error?: Error;
  onRetry: () => void;
  onFav: (id: string) => void;
}

export const RestaurantPage = (props: IProps): JSX.Element => {
  if (props.error) {
    return (
      <GridVerticalCenter>
        <Paper square style={{ padding: 20 }}>
          <Typography>Error: Failed to read.</Typography>
          <Button variant='outlined' onClick={props.onRetry}>Retry</Button>
        </Paper>
      </GridVerticalCenter>
    )
  }

  if (!props.restaurant.id) {
    return <GridVerticalCenter><CircularProgress /></GridVerticalCenter>
  }

  return <RestaurantCard restaurant={props.restaurant} onFav={props.onFav} />
}
