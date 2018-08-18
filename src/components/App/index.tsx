import * as React from 'react'
import { Link } from 'react-router-dom'
import { IData as IRestaurants } from '../../modules/restaurants'

export interface IProps {
  restaurants: IRestaurants;
}

export const App = (props: IProps) => {
  return <div>
    <Link to='/fdf'>fdf</Link>
    {JSON.stringify(props.restaurants)}
  </div>
}
