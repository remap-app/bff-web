import * as React from 'react'
import { withStyle } from 'styledux'
import { Location } from 'history'
import BottomNavigation from '@material-ui/core/BottomNavigation'
import _BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import RestaurantIcon from '@material-ui/icons/Restaurant'
import FavoriteIcon from '@material-ui/icons/Favorite'
import * as s from './index.css'
import { Link } from 'react-router-dom';

export interface IProps {
  value: number;
  location: Location;
  queryString: string;
}

const BottomNavigationAction: any = _BottomNavigationAction // TODO:
export const BottomNav = withStyle(s)((props: IProps): JSX.Element => {
  return (
    <BottomNavigation value={props.value} className={s.root} showLabels>
      <BottomNavigationAction
        label='Restaurants'
        icon={<RestaurantIcon />}
        component={Link}
        to={{ ...props.location, search: props.queryString, pathname: '/restaurants' }}
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
