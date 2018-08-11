import * as React from 'react'

interface IProps {
  restaurants: any;
}

export const App = (props: IProps) => {
  return <div>{JSON.stringify(props.restaurants)}</div>
}
