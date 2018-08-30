import { STATUS_CODES } from 'http'

const DEFAULT_TYPE: string = 'about:blank'

export class ProblemError extends Error {
  status: number
  title: string
  originalError?: Error
  type: string;
  details?: { [key: string]: any }

  public readonly name: 'ProblemError'

  constructor(status: number, title: string, originalError?: Error, type?: string, details?: { [key: string]: any }) {
    super(title)

    this.status = status
    this.title = title
    this.originalError = originalError
    this.type = type || DEFAULT_TYPE
    this.details = details

    Object.setPrototypeOf(this, ProblemError.prototype)
  }
}

export const createProblemError = (
  statusCode: number,
  title: string,
  original?: Error,
  type?: string,
  details?: { [key: string]: any }
): ProblemError => new ProblemError(statusCode, title, original, type, details)

export const createInternalServerError = (error: Error): ProblemError => {
  const title: any = STATUS_CODES[500]
  return createProblemError(500, title, error)
}

export interface IProblemErrorResponse {
  status: number;
  title: string;
  type: string;
  [key: string]: any;
}

export const createProblemErrorResponse = (error: ProblemError): IProblemErrorResponse => {
  return {
    ...error.details,
    status: error.status,
    title: error.title,
    type: error.type,
  }
}

export type MaybeProblemError = ProblemError | Error

export const createErrorResponse = (error: MaybeProblemError): IProblemErrorResponse => {
  if (error instanceof ProblemError) {
    return createProblemErrorResponse(error)
  }

  const e: any = error
  const status: number = e.status || e.statusCode || 500
  const title: any = STATUS_CODES[status]
  return {
    status,
    title,
    type: DEFAULT_TYPE,
  }
}
