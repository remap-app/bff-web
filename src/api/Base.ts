import { throwInternalServerError, createProblemError } from './helpers'

export class Base {
  static async get(url: string): Promise<any> {
    const res = await fetch(url).catch((e: Error) => { throw e })

    const body = await res.json().catch(throwInternalServerError)

    if (res.ok) {
      return body
    }

    const { status, title, type, ...rest } = body
    throw createProblemError(status, title, undefined, type, rest)
  }
}
