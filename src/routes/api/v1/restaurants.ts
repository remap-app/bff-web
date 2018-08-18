import { Request, Response } from 'express'
import { Restaurants } from '../../../api/restaurants'

export const getRestaurants = async (req: Request, res: Response) => {
  const result = await Restaurants.getList(req.query)
  res.json(result)
}

export const getRestaurantById = async (req: Request, res: Response) => {
  const result = await Restaurants.getById(req.params.id)
  res.json(result)
}
