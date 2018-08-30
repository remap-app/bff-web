import * as React from 'react'
import { withStyle } from 'styledux'
import classnames from 'classnames'
import { RestaurantCard } from '../RestaurantCard'
import { IData as IRestaurants } from '../../modules/restaurants'
import * as s from './index.css'

export interface IProps {
  restaurants: IRestaurants;
  className?: string | undefined;
}

export const RestaurantList = withStyle(s)((props: IProps): JSX.Element => {
  console.log('props', props) // eslint-disable-line
  return (
    <div className={classnames(s.root, props.className)}>
      {props.restaurants.map(r => {
        return <RestaurantCard key={r.id} restaurant={r} />
      })}
    </div>
  )
})
