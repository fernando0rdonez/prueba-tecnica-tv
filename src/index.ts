import mongoose from 'mongoose'
import { app } from './app'

async function start () {
  mongoose.connect('mongodb+srv://practicamongodb:8ZXeLZvkrmI8cKOk@cluster0.7jlkm.mongodb.net/directiv').then(() => {
    console.log('conected to DB')
  })

  app.listen(3000, () => {
    console.log('listen in port 3000')
  })
}

start()
