import { stringify as stringifyParsedQuery } from 'querystring'
import { Base } from '../Base'

export interface IQuery {
  latitude: string;
  longitude: string;
  range?: number;
  page?: number;
  per_page?: number;
}

export class Restaurants extends Base {
  private static get rootEndpoint() {
    return process.env.RESTAURANTS_ENDPOINT
  }

  public static async getList(query: IQuery): Promise<any> {
    return this.get(`${this.rootEndpoint}?${stringifyParsedQuery(query)}`)
  }

  public static async getById(id: string): Promise<any> {
    return this.get(`${this.rootEndpoint}/${id}`)
  }
}
