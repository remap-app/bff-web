import * as React from 'react'
import { withStyle } from 'styledux'
import GridList from '@material-ui/core/GridList'
import classnames from 'classnames'
import { RestaurantListItem } from '../RestaurantListItem'
import { IData as IRestaurants } from '../../modules/restaurants'
import * as s from './index.css'

export interface IProps {
  restaurants: IRestaurants;
  className?: string | undefined;
}

export const RestaurantList = withStyle(s)((props: IProps): JSX.Element => {
  return (
    <div className={classnames(s.root, props.className)}>
      <GridList style={{ margin: 0 }}>
        {props.restaurants.map(r => {
          return <RestaurantListItem key={r.id} restaurant={r} component='li' />
        })}
      </GridList>
    </div>
  )
})
