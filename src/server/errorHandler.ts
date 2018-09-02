import { Request, Response, NextFunction } from 'express'
import { createErrorResponse, MaybeProblemError } from '../api/helpers'

export const errorHandler = (error: MaybeProblemError, req: Request, res: Response, next: NextFunction) => {
  const errorResponse = createErrorResponse(error)
  res.status(errorResponse.status)
  res.json(errorResponse)
}
