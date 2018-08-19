import { createInternalServerError } from './helpers'

export class Base {
  static async get(url: string): Promise<any> {
    const res = await fetch(url)
    if (res.ok) {
      return await res.json()
    }
    return await res.json().catch((error: Error) => {
      throw createInternalServerError(error)
    })
  }
}
