import supertest from 'supertest';
import app from '../../index'
import { User , UserModel } from '../../models/users';
import { Order , OrderModel} from '../../models/orders';
import client from '../../database';


const orderModel = new OrderModel()
const userModel = new UserModel()
const request = supertest(app)
let token = ''

describe('Testing the logic of the Orders Model END POINTS', () => {
  const user = {
    userName: 'Ahmos',
    firstName: 'Ahmed',
    lastName: 'Mostafa',
    password: 'password123'
  } as User

  const order = {
    status: 'active',
    user_id: 1
  } as Order

  beforeAll(async () => {
    const createUser = await userModel.create(user)
    user.id = createUser.id
    order.user_id = createUser.id as number
    const creatOrder = await orderModel.create(order)
    order.id = creatOrder.id
  })

  afterAll(async () => {
    const connection = await client.connect()
    const sql1 = `DELETE FROM orders \nALTER SEQUENCE orders_id_seq RESTART WITH 1`
    await connection.query(sql1)
    const sql = `DELETE FROM users \nALTER SEQUENCE users_id_seq RESTART WITH 1`
    await connection.query(sql)
    connection.release()
  })

  describe('Test Authentication Method', () => {
    it('should be able to authenticate to get token ', async () => {
      const res = await request
        .post('/users/authenticate')
        .set('Content-type', 'application/json')
        .send({ userName: 'Ahmos', password: 'pass123' })
      expect(res.status).toBe(200)
      const {
        user_id,
        userName,
        firstName,
        lastName,
        token: userToken
      } = res.body.data
      expect(user_id).toBe(user.id)
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

  describe('Testing CRUD Operation methods for orders model', () => {
    it('Create new order By User', async () => {
      const res = await request
        .post('/orders')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({
          status: 'complete',
          user_id: user.id as number
        } as Order)
      expect(res.status).toBe(200)
      const { user_id, status } = res.body.data
      expect(user_id).toBe(user.id)
      expect(status).toBe('complete')
    })

    it('should get index of all orders', async () => {
      const res = await request
        .get('/orders')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
      expect(res.status).toBe(200)
      expect(Object.keys(res.body.data).length).toBe(2)
    })

    it ('should returen only completed orders'), async () => {
     const res = await request
     .get('/orders/status/complete')     
     .set('Content-type', 'application/json')
     .set('Authorization', `Bearer ${token}`)
     expect(res.status).toBe(200)
     expect(Object.keys(res.body.data).length).toBe(0)
    }

    it ('should returen only active orders'), async () => {
      const res = await request
      .get('/orders/status/active')     
      .set('Content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      expect(res.status).toBe(200)
      expect(Object.keys(res.body.data).length).toBe(1)
     }

    it('should delete one of orders', async () => {
      const res = await request
        .delete(`/orders${order.id}`)
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
      expect(res.status).toBe(200)
      expect(res.body.data.id).toBe(order.id)
      expect(res.body.data.user_id).toBe(order.user_id)
      expect(res.body.data.status).toBe('active')

      const res1 = await request
        .get('/api/orders')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
      expect(res1.status).toBe(200)
      expect(Object.keys(res1.body.data).length).toBe(1)
    })
  })
})