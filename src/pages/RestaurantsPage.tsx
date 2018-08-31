import * as React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import Peper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { GridVerticalCenter } from '../components/GridVerticalCenter'
import { IData as IRestaurants } from '../modules/restaurants'
import { ICoords, PositionError } from '../modules/geolocation'
import { RestaurantList } from '../components/RestaurantList'

export interface IProps {
  restaurants: IRestaurants;
  coords: ICoords;
  positionError?: PositionError;
  restaurantsLoaded: boolean;
}

export const RestaurantsPage = (props: IProps): JSX.Element => {
  if (props.positionError) {
    return (
      <GridVerticalCenter>
        <Peper square>
          <Typography>{props.positionError.toString()}</Typography>
        </Peper>
      </GridVerticalCenter>
    )
  }

  if (props.restaurantsLoaded === false) {
    return <GridVerticalCenter><CircularProgress /></GridVerticalCenter>
  }

  return <RestaurantList restaurants={props.restaurants} coords={props.coords} />
}
