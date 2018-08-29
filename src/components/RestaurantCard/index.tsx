import * as React from 'react'
import { withStyle } from 'styledux'
import classnames from 'classnames'
import Button from '@material-ui/core/Button'
import { IEntity as IRestaurant } from '../../modules/restaurants'
import * as s from './index.css'

export interface IProps {
  restaurant: IRestaurant;
  className?: string | undefined;
}

export const RestaurantCard = withStyle(s)((props: IProps): JSX.Element => {
  return (
    <div className={classnames(s.root, props.className)}>
      <div>{props.restaurant.name}</div>
      <Button>test</Button>
    </div>
  )
})
