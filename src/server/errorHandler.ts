import { Request, Response } from 'express'
import { createErrorResponse, MaybeProblemError } from '../api/helpers'

export const errorHandler = (err: MaybeProblemError, req: Request, res: Response) => {
  res.json(createErrorResponse(err))
}
