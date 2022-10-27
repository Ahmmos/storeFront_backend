import supertest from 'supertest';
import app from '../../index';
import { Product , ProductsModel } from '../../models/products';
import client from '../../database'
import { User , UserModel } from '../../models/users';

const productModel = new ProductsModel()
const userModel = new UserModel()
const request = supertest(app)
let token = ''

describe('Testing the logic of the Products Model END POINTS', () => {
  const product = {
    name: "Apple",
    price: 25,
    category: "fruit"
  } as Product

  const user = {
    userName: 'Ahmos',
    firstName: 'Ahmed',
    lastName: 'Mostafa',
    password: 'password123'
  } as User

  beforeAll(async () => {
    const createUser = await userModel.create(user)
    user.id = createUser.id
    const creatProduct = await productModel.create(product)
    product.id = creatProduct.id
  })

  afterAll(async () => {
    const connection = await client.connect()
    const sql1 = 'DELETE FROM users \nALTER SEQUENCE users_id_seq RESTART WITH 1;'
    await connection.query(sql1)
    const sql = 'DELETE FROM products \nALTER SEQUENCE products_id_seq RESTART WITH 1;'
    await connection.query(sql)
    connection.release()
  })

  describe('Test Authentication Method', () => {
    it('should be able to authenticate to get token ', async () => {
      const res = await request
        .post('/users/authenticate')
        .set('Content-type', 'application/json')
        .send({ userName: 'test', password: 'test' })
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

    it('should be failed to authenticated  with wrong user_name', async () => {
      const res = await request
        .post('/users/authenticate')
        .set('Content-type', 'application/json')
        .send({ userName: 'asd', password: 'asd' })
      expect(res.status).toBe(401)
    })
  })
  describe('Testing CRUD Operation methods for Products model', () => {
    it('Create new product by User', async () => {
      const res = await request
        .post('/products')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: "milk",
          price: 15,
          category: "dairy"
        } as Product)
      expect(res.status).toBe(200)
      const { name, price , category} = res.body.data
      expect(name).toBe('milk')
      expect(price).toBe('30')
      expect(category).toBe('dairy')
    })

    it('should get list of products', async () => {
      const res = await request
        .get('/products')
        .set('Content-type', 'application/json')
      expect(res.status).toBe(200)
      expect(Object.keys(res.body.data).length).toBe(2)
    })

    it('should get one of product', async () => {
      const res = await request
        .get(`/products${product.id}/`)
        .set('Content-type', 'application/json')
      const { name, price, category } = res.body.data
      expect(name).toBe('Apple')
      expect(price).toBe('25')
      expect(category).toBe('fruit')
    })

    it('should choose all products of same category', async () => {
      const res = await request
     
        .get('/products/cat/fruit')
        .set('Content-type', 'application/json')
      expect(res.status).toBe(200)
      expect(res.body.data.category).toBe('fruit')
    })

    it('should choose Top 5 purchased products', async () => {
      const res = await request
     
        .get('/products/top/top5')
        .set('Content-type', 'application/json')
      expect(res.status).toBe(200)
      expect(Object.keys(res.body.data).length).toBe(2)
    })
    
  })

})