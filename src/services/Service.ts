import { createUnknownError } from '../helpers'

export class Service {
  static async get(url: string): Promise<any> {
    const res = await fetch(url)
    if (res.ok) {
      return await res.json()
    }
    return await res.json().catch(createUnknownError)
  }
}
