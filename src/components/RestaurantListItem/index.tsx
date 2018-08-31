import * as React from 'react'
import { Link } from 'react-router-dom'
import { withStyle } from 'styledux'
import classnames from 'classnames'
import Avatar from '@material-ui/core/Avatar'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import _CardActionArea from '@material-ui/core/CardActionArea'
import Typography from '@material-ui/core/Typography'
import { MediaPlaceholder } from '../MediaPlaceholder'
import { IData as IRestaurant } from '../../modules/restaurant'
import * as s from './index.css'

export interface IProps {
  restaurant: IRestaurant;
  className?: string | undefined;
  component?: string;
}

const CardActionArea: any = _CardActionArea // TODO
export const RestaurantListItem = withStyle(s)((props: IProps): JSX.Element => {
  return (
    <Card className={classnames(s.root, props.className)} component={props.component}>
      <CardActionArea className={`${s.action} ${s.link}`} component={Link} to={`/restaurants/${props.restaurant.id}`}>
        <CardHeader
          avatar={<Avatar>{props.restaurant.name.slice(0, 1)}</Avatar>}
          title={props.restaurant.name}
          subheader={props.restaurant.catchphrase || '-'}
        />
        {props.restaurant.images[0]
          ? <CardMedia image={props.restaurant.images[0]} className={s.media} />
          : <MediaPlaceholder />}
        <CardContent>
          <Typography component='p'>{props.restaurant.description || '-'}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
})
