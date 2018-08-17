/// <reference path='../index.d.ts' />

import { createError } from 'micro-errors'

export const createUnknownError = (error: Error): Error => {
  return createError(520, 'Unknown Error', error)
}

export const isServer: boolean = !(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
)
