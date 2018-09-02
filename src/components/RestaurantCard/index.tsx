import * as React from 'react'
import { withStyle } from 'styledux'
import classnames from 'classnames'
import Avatar from '@material-ui/core/Avatar'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import FavoriteIcon from '@material-ui/icons/Favorite'
import { MediaPlaceholder } from '../MediaPlaceholder'
import { SingleLineMediaList } from '../SingleLineMediaList'
import { IData as IRestaurant } from '../../modules/restaurant'
import { ResturantInfo } from '../RestaurantInfo'
import * as s from './index.css'

export interface IProps {
  restaurant: IRestaurant;
  className?: string | undefined;
  component?: string;
  onFav: (id: string) => void;
}

export const RestaurantCard = withStyle(s)((props: IProps): JSX.Element => {
  return (
    <Card className={classnames(s.root, props.className)} component={props.component}>
      <CardHeader
        avatar={<Avatar>{props.restaurant.name.slice(0, 1)}</Avatar>}
        title={props.restaurant.name}
        action={
          <IconButton onClick={() => {
            props.onFav(props.restaurant.id)
          }}>
            <FavoriteIcon />
          </IconButton>
        }
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
