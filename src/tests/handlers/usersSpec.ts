import supertest from 'supertest';
import app from '../../index'
import { User , UserModel } from '../../models/users';
import client from '../../database'

const userModel = new UserModel()
const request = supertest(app)
let token = ''

describe('User Api end-point', () => {
  const user = {
    userName: 'Ahmos',
    firstName: 'Ahmed',
    lastName: 'Mostafa',
    password: 'password123'
  } as User

  beforeAll(async () => {
    const createUser = await userModel.create(user)
    user.id= createUser.id
  })

  afterAll(async () => {
    const connection = await client.connect()
    const sql = 'DELETE FROM users'
    await connection.query(sql)
    connection.release()
  })

  describe('Test Authentication Method', () => {
    it('should be able to authenticate to get token ', async () => {
      const res = await request
        .post('/users/authenticate')
        .send({ userName: 'Ahmos', password: 'password123' })
      expect(res.status).toBe(200)
      const {
        id,
        userName,
        firstName,
        lastName,
        token: userToken
      } = res.body.data
      expect(id).toBe(user.id)
      expect(userName).toBe(user.userName)
      expect(firstName).toBe(user.firstName)
      expect(lastName).toBe(user.lastName)
      token = userToken
    })

    it('should be failed to authenticated  with wrong userName', async () => {
      const res = await request
        .post('/users/authenticate')
        .set('Content-type', 'application/json')
        .send({ userName: 'asd', password: 'asd' })
      expect(res.status).toBe(401)
    })
  })

  describe('Testing CRUD Operation methods for USERMODEL', () => {
    it('Create User new one', async () => {
      const res = await request
        .post('/users')
        .set('Content-type', 'application/json')
        .send({
          userName: 'test',
          firstName: 'testfirst',
          lastName: 'testlast',
          password: 'Passtest'
        } as User)
      expect(res.status).toBe(200)
      const { userName, firstName, lastName } = res.body.data.user
      expect(userName).toBe('test')
      expect(firstName).toBe('testfirst')
      expect(lastName).toBe('testlast')
    })

    it('index should get list of users', async () => {
      const res = await request
        .get('users')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
      expect(res.status).toBe(200)
      expect(res.body.data.users.length).toBe(2)
    })

    it('show should get one user', async () => {
      const res = await request
        .get(`/api/users/${user.id}`)
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
      const { user_id, userName, firstName, lastName } =
        res.body.data.user
      expect(user_id).toBe(user.id)
      expect(userName).toBe('test')
      expect(firstName).toBe('testfirst')
      expect(lastName).toBe('testlast')
    })

    it('update should update one of users', async () => {
      const res = await request
        .patch(`/api/users/${user.id}`)
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({
          ...user,
          userName: 'test2',
          firstName: 'testfirst2',
          lastName: 'testlast2'
        })
      expect(res.status).toBe(200)
      const { user_id, userName, firstName, lastName } =
        res.body.data.user
      expect(user_id).toBe(user.id)
      expect(userName).toBe('test2')
      expect(firstName).toBe('testfirst2')
      expect(lastName).toBe('testlast2')
    })

    it('should delete one of users', async () => {
      const res = await request
        .delete(`users/${user.id}`)
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
      expect(res.status).toBe(200)
      expect(res.body.data.user_id).toBe(user.id)
      expect(res.body.data.userName).toBe('test2')
    })
  })
});
