import * as React from 'react'
import { hot } from 'react-hot-loader'
import { Hello } from '../components/Hello'

export const Root = hot(module)(function() {
  return <Hello name='World' />
})
