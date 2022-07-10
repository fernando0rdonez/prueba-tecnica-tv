import { ValidationError } from 'express-validator'
import { CustomError } from './custom-error'

export class RequestValidateError extends CustomError {
  statusCode = 400
  constructor (public erros: ValidationError[]) {
    super('Invalid request')
    Object.setPrototypeOf(this, RequestValidateError.prototype)
  }

  serializateError () {
    return this.erros.map((error) => {
      return { message: error.msg, field: error.param }
    })
  }
}
