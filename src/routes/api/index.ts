import { Router, Response } from 'express'
import { getRestaurants, getRestaurantById } from './v1/restaurants'
import { getStocks, getStockById, createStock, deleteStockById } from './v1/stocks'

const router = Router()

router.get('/v1/restaurants', getRestaurants)
router.get('/v1/restaurants/:id', getRestaurantById)

router.post('/vi/stocks', createStock)
router.get('/v1/stocks', getStocks)
router.get('/v1/stocks/:id', getStockById)
router.delete('vi/stocks/:id', deleteStockById)

router.get('/*', (_, res: Response) => {
  res.status(404).json({
    error: 'Not Found',
    status: 404,
  })
})

export default router
