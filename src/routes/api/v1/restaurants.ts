import * as express from 'express'
import { Restaurants } from '../../../api/restaurants'

export const getRestaurants = async (req: express.Request, res: express.Response) => {
  const result = await Restaurants.getList(req.query)
  res.json(result)
}

export const getRestaurantById = async (req: express.Request, res: express.Response) => {
  const result = await Restaurants.getById(req.params.id)
  res.json(result)
}
