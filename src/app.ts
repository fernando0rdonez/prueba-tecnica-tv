import express from 'express'
import 'express-async-errors'
import { NotFoundError } from './errors/not-found-error'
import { errorHandler } from './middleware/error-handler'
import { signup } from './routes/signup'

const app = express()
app.use(express.json())

app.use(signup)

app.all('*', () => {
  throw new NotFoundError()
})
app.use(errorHandler)

export { app }
