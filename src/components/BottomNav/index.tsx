import * as React from 'react'
import { withStyle } from 'styledux'
import { Location } from 'history'
import { Link } from 'react-router-dom'
import BottomNavigation from '@material-ui/core/BottomNavigation'
import _BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import RestaurantIcon from '@material-ui/icons/Restaurant'
import FavoriteIcon from '@material-ui/icons/Favorite'
import { ICoords } from '../../modules/geolocation'
import * as s from './index.css'

export interface IProps {
  value: number;
  location: Location;
  coords: ICoords;
}

const BottomNavigationAction: any = _BottomNavigationAction // TODO:
export const BottomNav = withStyle(s)((props: IProps): JSX.Element => {
  const search: string = props.coords
    ? `?latitude=${props.coords.latitude}&longitude=${props.coords.longitude}`
    : ''

  const restaurantsDescriptor = { ...props.location, pathname: '/restaurants' }

  if (search) {
    restaurantsDescriptor.search = search
  }

  return (
    <BottomNavigation value={props.value} className={s.root} showLabels>
      <BottomNavigationAction
        label='Restaurants'
        icon={<RestaurantIcon />}
        component={Link}
        to={restaurantsDescriptor}
      />
      <BottomNavigationAction
        label='Stocks'
        icon={<FavoriteIcon />}
        component={Link}
        to='/stocks'
      />
    </BottomNavigation>
  )
})
