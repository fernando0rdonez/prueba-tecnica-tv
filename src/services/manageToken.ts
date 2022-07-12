import jwt from 'jsonwebtoken'
import { NotAuthorizedError } from '../errors/not-authorized-error'
import { IUser, IUserDecryt } from '../types/types'

export class ManageToken {
  static sign (payload: IUser):string {
    const token = jwt.sign({ data: payload }, process.env.SECRET_KEY || 'abcd', { expiresIn: '30' })
    return token
  }

  static verify (token: string): IUser | undefined {
    let user : IUser
    try {
      const userDecrypt = jwt.verify(token, process.env.SECRET_KEY || 'abcd') as IUserDecryt
      user = userDecrypt.data
    } catch (error) {
      let message = 'Not authorized'
      if (error instanceof jwt.JsonWebTokenError) {
        message = error.name === 'TokenExpiredError' ? 'Invalid session' : message
      }
      throw new NotAuthorizedError(message)
    }
    return user!
  }
}
