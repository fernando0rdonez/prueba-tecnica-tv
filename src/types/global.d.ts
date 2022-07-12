/* eslint-disable no-unused-vars */
import { IUser } from './types'

export { }
declare global {
  namespace Express {
      interface Request {
        currentUser?: IUser
      }

  }
}
declare global {
// eslint-disable-next-line no-var
var signup: ()=> Promise<void> // can't use type 'any' here
}
