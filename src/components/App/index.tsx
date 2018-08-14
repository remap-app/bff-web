import * as React from 'react'
import { Link } from 'react-router-dom'

interface IProps {
  restaurants: any;
}

export const App = (props: IProps) => {
  return <div>
    <Link to='/fdf'>fdf</Link>
    {JSON.stringify(props.restaurants)}
  </div>
}
