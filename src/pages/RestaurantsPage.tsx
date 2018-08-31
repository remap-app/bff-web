import * as React from 'react'
import { Link } from 'react-router-dom'
import { IData as IRestaurants } from '../modules/restaurants'
import { ICoords, PositionError } from '../modules/geolocation'
import { RestaurantList } from '../components/RestaurantList'

export interface IProps {
  restaurants: IRestaurants;
  coords: ICoords;
  positionError?: PositionError;
}

export class RestaurantsPage extends React.Component<IProps> {
  componentDidMount(): void {
  }

  render(): JSX.Element {
    // tmp
    console.log('this.props.positionError', this.props.positionError)
    if (this.props.positionError) {
      return <div style={{ margin: 40 }}>{this.props.positionError.toString()}</div>
    }
    if (!this.props.coords) {
    }
    if (this.props.restaurants.length === 0) {
      return <Link to={{ search: '?latitude=35.626208&longitude=139.6313544' }}>?latitude=35.626208&longitude=139.6313544</Link>
    }
    return <RestaurantList restaurants={this.props.restaurants} coords={this.props.coords} />
  }
}
