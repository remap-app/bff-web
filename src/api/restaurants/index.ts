import { stringify as stringifyParsedQuery, ParsedUrlQuery } from 'querystring'
import { Base } from '../Base'
import { isServer } from '../../helpers'

export interface IQuery extends ParsedUrlQuery {
  latitude: string;
  longitude: string;
  range?: string;
  page?: string;
  per_page?: string;
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
    return isServer ? process.env.RESTAURANTS_ENDPOINT : '/api/v1/restaurants'
  }

  public static async getList(query: IQuery): Promise<IRestaurant[]> {
    return await this.get(`${this.rootEndpoint}/?${stringifyParsedQuery(query)}`)
  }

  public static async getById(id: string): Promise<IRestaurant> {
    return await this.get(`${this.rootEndpoint}/${id}`)
  }
}
