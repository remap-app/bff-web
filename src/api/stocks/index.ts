import { stringify as stringifyParsedQuery, ParsedUrlQuery } from 'querystring'
import { Base } from '../Base'
import { isServer } from '../../helpers'

export interface IQuery extends ParsedUrlQuery {
  page?: string;
  per_page?: string;
}

export interface IStock {
  id: string;
  restaurant_id: string;
  created_at: string;
  updated_at: string;
}

export class Stocks extends Base {
  private static baseHeaders(idToken?: string) {
    return { Authorization: `Bearer ${idToken}` }
  }

  private static get rootEndpoint() {
    return isServer ? process.env.STOCKS_ENDPOINT : '/api/v1/stocks'
  }

  public static async create(restaurantId: string, token: string): Promise<any> {
    console.log('restaurantId', restaurantId)
    return await this.post(`${this.rootEndpoint}`, {
      headers: new Headers({
        'Content-Type': 'application/json',
        ...this.baseHeaders(token),
      }),
      body: JSON.stringify({ restaurant_id: restaurantId }),
    })
  }

  public static async getList(query: IQuery, token: string): Promise<IStock[]> {
    const queryString: string = stringifyParsedQuery(query)
    const param: string = queryString ? `?${queryString}` : ''
    return await this.get(`${this.rootEndpoint}${param}`, {
      headers: new Headers(this.baseHeaders(token)),
    })
  }

  public static async getById(id: string, token: string): Promise<IStock> {
    return await this.get(`${this.rootEndpoint}/${id}`, {
      headers: new Headers(this.baseHeaders(token)),
    })
  }

  public static async deleteById(id: string, token: string): Promise<any> {
    return await this.delete(`${this.rootEndpoint}/${id}`, {
      headers: new Headers(this.baseHeaders(token)),
    })
  }
}
