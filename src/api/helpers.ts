/// <reference path='../index.d.ts' />

import { createError } from 'micro-errors'

export const createInternalServerError = (error: Error): Error => {
  return createError(500, 'Internal Server Error', error)
}
