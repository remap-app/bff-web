/// <reference path='../typings.d.ts' />

import { createError } from 'micro-errors'

export const createUnknownError = (error: Error): Error => {
  return createError(520, 'Unknown Error', error)
}
