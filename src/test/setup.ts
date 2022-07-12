import mongoose from 'mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server'
import request from 'supertest'
import { app } from '../app'

let mongo : any
beforeAll(async () => {
  process.env.SECRET_KEY = 'abcd' // for encrypt the passowrd
  mongo = await MongoMemoryServer.create()
  const mongoUri = mongo.getUri()
  await mongoose.connect(mongoUri, {})
})

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections()

  for (const collect of collections) {
    await collect.deleteMany({})
  }
})

afterAll(async () => {
  if (mongo) {
    await mongo.stop()
  }
  await mongoose.connection.close()
})
global.signup = async () => {
  await request(app)
    .post('/signup')
    .send({
      name: 'Fernando',
      email: 'fernandso@aswd.as',
      password: '12345678',
      phones: [
        {
          number: '123456789',
          ddd: '111'
        }
      ]
    }).expect(201)
}
