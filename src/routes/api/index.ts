import { Router, Response } from 'express'
import { getRestaurants, getRestaurantById } from './v1/restaurants'
const router = Router()

router.get('/v1/restaurants', getRestaurants)
router.get('/v1/restaurants/:id', getRestaurantById)
router.get('/*', (_, res: Response) => {
  res.status(404).json({
    error: 'Not Found',
    status: 404,
  })
})

export default router
