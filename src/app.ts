import express from 'express'
import 'express-async-errors'
import { NotFoundError } from './errors/not-found-error'
import { errorHandler } from './middleware/error-handler'
import { signup } from './routes/signup'
import { signin } from './routes/signin'
import { search } from './routes/search'

const app = express()
app.use(express.json())

app.use(signup)
app.use(signin)
app.use(search)

app.all('*', () => {
  throw new NotFoundError()
})
app.use(errorHandler)

export { app }
