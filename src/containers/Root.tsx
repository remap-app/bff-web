import * as React from 'react'
import { hot } from 'react-hot-loader'
import { App } from '../components/App'
import { Hello } from '../components/Hello'

export interface IRootProps {
  restaurants: any;
}

export const Root = hot(module)((props: IRootProps) => {
  return <div>
    <Hello name='World' />
    <App restaurants={props.restaurants} />
  </div>
})
