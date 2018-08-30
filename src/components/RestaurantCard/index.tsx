import * as React from 'react'
import { withStyle } from 'styledux'
import classnames from 'classnames'
import Avatar from '@material-ui/core/Avatar'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import { MediaPlaceholder } from '../MediaPlaceholder'
import { SingleLineMediaList } from '../SingleLineMediaList'
import { IEntity as IRestaurant } from '../../modules/restaurants'
import { ResturantInfo } from '../RestaurantInfo'
import * as s from './index.css'

export interface IProps {
  restaurant: IRestaurant;
  className?: string | undefined;
  component?: string;
}

export const RestaurantCard = withStyle(s)((props: IProps): JSX.Element => {
  return (
    <Card className={classnames(s.root, props.className)} component={props.component}>
      <CardHeader
        avatar={<Avatar>{props.restaurant.name.slice(0, 1)}</Avatar>}
        title={props.restaurant.name}
        subheader={props.restaurant.catchphrase || '-'}
      />
      {props.restaurant.images.length === 0
        ? <MediaPlaceholder />
        : <SingleLineMediaList images={props.restaurant.images} />}
      <CardContent>
        <Typography component='p'>{props.restaurant.description || '-'}</Typography>
        <ResturantInfo restaurant={props.restaurant}/>
      </CardContent>
    </Card>
  )
})
