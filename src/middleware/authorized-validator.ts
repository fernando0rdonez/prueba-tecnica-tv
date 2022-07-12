import { NextFunction, Request, Response } from 'express'
import { NotAuthorizedError } from '../errors/not-authorized-error'
import { User } from '../models/User'
import { ManageToken } from '../services/manageToken'

export async function authorized (req: Request, _res:Response, next: NextFunction) {
  if (!req.headers.authorization) {
    throw new NotAuthorizedError('Not authorized')
  }

  const token = req.headers.authorization
  const payloadBase64 = token.split(' ')[1].trim()

  const user = ManageToken.verify(payloadBase64)
  const currenteUser = await User.findOne({ email: user?.email })
  if (!currenteUser) {
    throw new NotAuthorizedError('Not authorized')
  }
  req.currentUser = currenteUser
  next()
}
