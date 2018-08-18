import * as React from 'react'
import { hot } from 'react-hot-loader'
import { Routes } from '../routes/Routes'
import { Restaurants } from '../api/restaurants'

export const Root = hot(module)(() => {
  return (
    <div>
      <Routes />
    </div>
  )
})

export const getInitialProps = async () => {
  const restaurants = await Restaurants.getById('J384729348')
  return { restaurants }
}
