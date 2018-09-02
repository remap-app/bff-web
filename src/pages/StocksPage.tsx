import * as React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import { GridVerticalCenter } from '../components/GridVerticalCenter'
import { IData as IRestaurants } from '../modules/restaurants'
import { RestaurantList } from '../components/RestaurantList'

export interface IProps {
  stocks: IRestaurants;
  stocksLoaded: boolean;
}

export const StocksPage = (props: IProps): JSX.Element => {
  if (props.stocksLoaded === false) {
    return <GridVerticalCenter><CircularProgress /></GridVerticalCenter>
  }

  return <RestaurantList restaurants={props.stocks} />
}
