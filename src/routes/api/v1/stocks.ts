import { Request, Response } from 'express'
import { Stocks, IStock } from '../../../api/stocks'
import { Restaurants, IRestaurant } from '../../../api/restaurants'

export const createStock = async (req: Request, res: Response) => {
  const _req: any = req // TODO:
  console.log('req.body', req.body)
  const maybeError = await Stocks.create(req.body.restaurant_id, _req.universalCookies.get('__t')).catch((e: Error) => e)
  console.log('maybeError', maybeError)
  if (maybeError instanceof Error) {
    throw maybeError
  }
  res.status(201)
}

export const getStocks = async (req: Request, res: Response) => {
  const _req: any = req // TODO:
  const token = _req.universalCookies.get('__t')
  const stocks: IStock[] = await Stocks.getList(req.query, token)
  const id: string = stocks.map((stock: IStock) => stock.id).join(',')
  const result: IRestaurant[] = await (id ? Restaurants.getList({ id }) : Promise.resolve([]))
  res.json(result)
}

export const getStockById = async (req: Request, res: Response) => {
  const _req: any = req // TODO:
  const stock: IStock = await Stocks.getById(req.params.id, _req.universalCookies.get('__t'))
  const result: IRestaurant = await Restaurants.getById(stock.restaurant_id)
  res.json(result)
}

export const deleteStockById = async (req: Request, res: Response) => {
  const _req: any = req // TODO:
  const stock: IStock = await Stocks.deleteById(req.params.id, _req.universalCookies.get('__t'))
  await Restaurants.getById(stock.restaurant_id)
  res.status(204)
}
