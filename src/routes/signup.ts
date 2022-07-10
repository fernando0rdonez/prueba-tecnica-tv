import express, { Request, Response } from 'express'
import { body, check } from 'express-validator'
import { BadRequestError } from '../errors/bad-request-error'
import { requestValidate } from '../middleware/request-validate'
import { User } from '../models/User'

const router = express.Router()

router.post('/signup', [
  body('name').notEmpty(),
  body('email').trim().isEmail(),
  body('password').trim().isLength({ min: 6 }),
  body('phones').isArray(),
  check('phones.*.number').isLength({ min: 9 }),
  check('phones.*.ddd').notEmpty()
], requestValidate, async (req: Request, res: Response) => {
  const params = req.body
  const existingUser = await User.findOne({ email: params.email })
  if (existingUser) {
    throw new BadRequestError('User alredy exist')
  }

  const newUser = new User(params)
  await newUser.save()

  res.status(201).send(newUser.toJSON())
})

export { router as signup }
