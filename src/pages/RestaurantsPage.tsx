import * as React from 'react'
import { Link } from 'react-router-dom'
import { IData as IRestaurants } from '../modules/restaurants'
import { RestaurantList } from '../components/RestaurantList'

export interface IProps {
  restaurants: IRestaurants;
}

export const RestaurantsPage = (props: IProps): JSX.Element => {
  // tmp
  if (props.restaurants.length === 0) {
    return <Link to={{ search: '?latitude=35.626208&longitude=139.6313544' }}>?latitude=35.626208&longitude=139.6313544</Link>
  }
  return <RestaurantList restaurants={props.restaurants} />
}
