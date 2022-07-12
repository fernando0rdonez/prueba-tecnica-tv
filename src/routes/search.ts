import express, { Response, Request } from 'express'
import { NotAuthorizedError } from '../errors/not-authorized-error'
import { authorized } from '../middleware/authorized-validator'
import { User } from '../models/User'

const router = express.Router()

router.get('/user/:id', authorized, async (req: Request, res: Response) => {
  const user = await User.findById(req.params.id)

  if (req.currentUser?.token !== user?.token) {
    throw new NotAuthorizedError('Not authorized')
  }

  res.send(req.currentUser)
})

export { router as search }
