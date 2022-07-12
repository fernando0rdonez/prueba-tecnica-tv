import express, { Request, Response } from 'express'
import { body, check } from 'express-validator'
import { BadRequestError } from '../errors/bad-request-error'
import { requestValidate } from '../middleware/request-validate'
import { User } from '../models/User'
import { ManageToken } from '../services/manageToken'
import { IUser } from '../types/types'
const router = express.Router()

router.post('/signup', [
  body('name').notEmpty(),
  body('email').trim().isEmail(),
  body('password').trim().isLength({ min: 6 }),
  body('phones').isArray(),
  check('phones.*.number').isLength({ min: 9 }),
  check('phones.*.ddd').notEmpty()
], requestValidate, async (req: Request, res: Response) => {
  const params = req.body as IUser
  const existingUser = await User.findOne({ email: params.email })

  if (existingUser) {
    throw new BadRequestError('E-mail already exists')
  }

  params.token = ManageToken.sign(params)
  params.last_login = new Date()

  const user = new User(params)
  await user.save()

  res.status(201).send(user.toJSON())
})

export { router as signup }
