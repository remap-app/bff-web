import * as React from 'react'
import { hot } from 'react-hot-loader'
import { App } from '../components/App'
import { Hello } from '../components/Hello'

interface IProps {
  restaurants: any;
}

export const Root = hot(module)((props: IProps) => {
  return <div>
    <Hello name='World' />
    <App restaurants={props.restaurants} />
  </div>
})
