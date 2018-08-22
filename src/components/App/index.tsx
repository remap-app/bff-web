import * as React from 'react'
import { Link } from 'react-router-dom'
import { withStyle } from 'styledux'
import { IData as IRestaurants } from '../../modules/restaurants'
import * as s from './index.css'

export interface IProps {
  restaurants: IRestaurants;
}

export const App = withStyle(s)((props: IProps) => {
  return <div className={s.root}>
    <Link to='/fdf'>fdf</Link>
    {JSON.stringify(props.restaurants)}
  </div>
})
