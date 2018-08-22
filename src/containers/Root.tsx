import * as React from 'react'
import { hot } from 'react-hot-loader'
import { Routes } from '../routes/Routes'

export const Root = hot(module)(() => {
  return (
    <div>
      <Routes />
    </div>
  )
})
