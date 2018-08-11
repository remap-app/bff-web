import * as querystring from 'querystring'
import { IQuery } from './types'

export class Restaurants {
  static async getList(query: IQuery): Promise<any> {
    const res = await fetch(`${process.env.RESTAURANTS_ENDPOINT}?${querystring.stringify(query)}`)
    if (res.ok) {
      return await res.json()
    }
    const error = await res.json().catch(() => ({ error: 'Unknown error' }))
    throw new Error(error.error)
  }
}
