import { app } from '../../app'
import request from 'supertest'

it('return 200 after login', async () => {
  await global.signup()
  return request(app)
    .post('/signin')
    .send({
      email: 'fernandso@aswd.as',
      password: '12345678'
    }).expect(200)
})

it('return token after login', async () => {
  await global.signup()
  const response = await request(app)
    .post('/signin')
    .send({
      email: 'fernandso@aswd.as',
      password: '12345678'
    }).expect(200)

  expect(response.body.token).toBeDefined()
})
