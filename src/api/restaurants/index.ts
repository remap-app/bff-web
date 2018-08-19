import { stringify as stringifyParsedQuery } from 'querystring'
import { Base } from '../Base'

export interface IQuery {
  latitude: string;
  longitude: string;
  range?: number;
  page?: number;
  per_page?: number;
}

export interface IRestaurant {
  id: string;
  name: string;
  name_kana: string;
  latitude: string;
  longitude: string;
  url: string;
  url_mobile?: string;
  images: string[];
  coupon_url: { desktop?: string, mobile?: string };
  tel?: string;
  opening_times?: string;
  catchphrase?: string;
  description?: string;
  access?: string;
  holiday?: string;
  credit_card?: string;
  non_smoking?: string;
  lunch?: string;
  children?: string;
}

export class Restaurants extends Base {
  private static get rootEndpoint() {
    return process.env.RESTAURANTS_ENDPOINT
  }

  public static async getList(query: IQuery): Promise<IRestaurant[]> {
    return await this.get(`${this.rootEndpoint}?${stringifyParsedQuery(query)}`)
  }

  public static async getById(id: string): Promise<IRestaurant> {
    return await this.get(`${this.rootEndpoint}/${id}`)
  }
}
