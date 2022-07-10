import express, { Request, Response } from 'express'
import { body, check } from 'express-validator'
import { requestValidate } from '../middleware/request-validate'

const router = express.Router()

router.post('/signup', [
  body('name').notEmpty(),
  body('email').trim().isEmail(),
  body('password').trim().isLength({ min: 6 }),
  body('phones').isArray(),
  check('phones.*.number').isLength({ min: 9 }),
  check('phones.*.ddd').notEmpty()
], requestValidate, (req: Request, res: Response) => {
  res.send(req.body)
})

export { router as signup }
