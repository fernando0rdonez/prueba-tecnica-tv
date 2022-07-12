import express, { Request, Response } from 'express'
import { body } from 'express-validator'
import { NotAuthorizedError } from '../errors/not-authorized-error'
import { User } from '../models/User'
import { HashPassword } from '../services/hashPassword'
import { ManageToken } from '../services/manageToken'

const router = express.Router()

router.post('/signin', [
  body('email').isEmail(),
  body('password').isLength({ min: 6 })
], async (req: Request, res: Response) => {
  const user = await User.findOne({ email: req.body.email })

  if (!user || (!HashPassword.compare(user.password!, req.body.password))) {
    throw new NotAuthorizedError('Invalid username and/or password')
  }

  user.last_login = new Date()
  user.token = ManageToken.sign(user)
  await user.save()

  res.send(user.toJSON())
})

export { router as signin }
