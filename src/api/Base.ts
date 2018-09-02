import { throwInternalServerError, createProblemError } from './helpers'

export class Base {
  private static async request(method: string, url: string, headers?: any, body?: any): Promise<any> {
    const res = await fetch(url, { method, headers, body }).catch((e: Error) => { throw e })

    const resBody = await res.json().catch(throwInternalServerError)

    if (res.ok) {
      return resBody
    }

    const { status, title, type, ...rest } = resBody
    throw createProblemError(status, title, undefined, type, rest)
  }

  protected static async get(url: string, opts: { headers?: any } = {}): Promise<any> {
    return await this.request('GET', url, opts.headers)
  }

  protected static async post(url: string, opts: { headers?: any, body?: any } = {}): Promise<any> {
    return await this.request('POST', url, opts.headers, opts.body)
  }

  protected static async delete(url: string, opts: { headers?: any } = {}): Promise<any> {
    return await this.request('DELETE', url, opts.headers)
  }
}
