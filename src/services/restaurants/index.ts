import * as querystring from 'querystring'
import { Service } from '../Service'
import { IQuery } from './types'

export class Restaurants extends Service {
  private static get rootEndpoint() {
    return process.env.RESTAURANTS_ENDPOINT
  }

  public static async getList(query: IQuery): Promise<any> {
    return this.get(`${this.rootEndpoint}?${querystring.stringify(query)}`)
  }

  public static async getById(id: string): Promise<any> {
    return this.get(`${this.rootEndpoint}/${id}`)
  }
}
