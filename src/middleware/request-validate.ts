import { NextFunction, Request, Response } from 'express'
import { validationResult } from 'express-validator'
import { RequestValidateError } from '../errors/request-validate-error'

export const requestValidate = (req : Request, _res: Response, next: NextFunction) => {
  const errors = validationResult(req)

  if (errors.array().length > 0) {
    throw new RequestValidateError(errors.array())
  }

  next()
}
