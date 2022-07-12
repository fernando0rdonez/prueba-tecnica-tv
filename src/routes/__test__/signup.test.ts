import { app } from '../../app'
import request from 'supertest'

it('return 201 after signup a user', async () => {
  return request(app)
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
})

it('return a correct structure of User', async () => {
  const response = await request(app)
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
  expect(response.body.id).toBeDefined()
  expect(response.body.token).toBeDefined()
  expect(response.body.name).toBeDefined()
  expect(response.body.email).toBeDefined()
  // expect(response.body.passowrd).toBeDefined()
  expect(response.body.last_login).toBeDefined()
  expect(response.body.phones).toBeDefined()
  expect(response.body.creation_date).toBeDefined()
  expect(response.body.updated_date).toBeDefined()
})

it('Don\'t allow duplicated user', async () => {
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
    }).expect(400)
})
