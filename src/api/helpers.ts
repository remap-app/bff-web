export class ProblemError extends Error {
  public readonly name: 'ProblemError'
  constructor(
    public status: number,
    public title: string,
    public originalError?: Error,
    public type: string = 'about:blank',
    public details?: { [key: string]: any }
  ) {
    super(title)
    Object.setPrototypeOf(this, ProblemError.prototype)
  }
}

export const createError = (
  statusCode: number,
  title: string,
  original?: Error,
  type?: string,
  details?: { [key: string]: any }
): ProblemError => {
  const error = new ProblemError(statusCode, title, original, type, details)
  return error
}

export const createInternalServerError = (error: Error): ProblemError => {
  return createError(500, 'Internal Server Error', error)
}
