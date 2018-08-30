import * as React from 'react'
import { withStyle } from 'styledux'
import GridList from '@material-ui/core/GridList'
import GridListTitle from '@material-ui/core/GridListTile'
import ListSubheader from '@material-ui/core/ListSubheader'
import LocationOff from '@material-ui/icons/LocationOff'
import LocationOn from '@material-ui/icons/LocationOn'
import classnames from 'classnames'
import { RestaurantCard } from '../RestaurantCard'
import { IData as IRestaurants } from '../../modules/restaurants'
import { ICoords } from '../../modules/geolocation'
import * as s from './index.css'

export interface IProps {
  restaurants: IRestaurants;
  coords?: ICoords;
  className?: string | undefined;
}

export const RestaurantList = withStyle(s)((props: IProps): JSX.Element => {
  return (
    <div className={classnames(s.root, props.className)}>
      <GridList>
        <GridListTitle key='subheader' cols={2} style={{ height: 'auto', color: '#666', textAlign: 'center' }}>
          {props.coords
            ? <ListSubheader component='div'>
                <LocationOn style={{ verticalAlign: 'middle' }} />
                <span style={{ verticalAlign: 'middle' }}>
                  {` ${props.coords.latitude} , ${props.coords.longitude}`}
                </span>
              </ListSubheader>
            : <LocationOff />}
        </GridListTitle>
        {props.restaurants.map(r => {
          return <RestaurantCard key={r.id} restaurant={r} component='li' />
        })}
      </GridList>
    </div>
  )
})
