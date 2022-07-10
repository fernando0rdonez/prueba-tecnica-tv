import express from 'express'
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

app.listen(3000, () => {
  console.log('Server avaliable on port 3000')
})
