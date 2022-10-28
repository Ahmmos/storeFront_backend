import client from '../../database';
import { Order,OrderModel } from '../../models/orders';
import { User,UserModel } from '../../models/users';

const userModel = new UserModel();
const orderModel = new OrderModel();


describe('Order Model', () => {
  describe('Test methods exists', () => {
    it('should have an index method', () => {
      expect(orderModel.index).toBeDefined()
    })
    
    it('should have a method show completed orders', () => {
      expect(orderModel.completedOrders).toBeDefined()
    })
    
    it('should have a Create User method', () => {
      expect(orderModel.create).toBeDefined()
    })
    
    it('should have method to show active orders', () => {
      expect(orderModel.currentOrders).toBeDefined()
    })
    
    it('should have a Delete order method', () => {
      expect(orderModel.deleteOrder).toBeDefined()
    })
  })
  
  describe('Test Order Model Logic', () => {
    const order:Order = {
      
      status:"complete",
      user_id:2
    } as Order

    const user :User ={
      userName:"Ahmos",
      firstName: "Ahmed",
      lastName: "Mostafa",
      password: "ahmos123"
    } as User
    
    beforeAll(async () => {
      const createdUser = await userModel.create(user)
      user.id= createdUser.id
      const createdOrder = await orderModel.create(order)
      order.id = createdOrder.id
    })
    
    afterAll(async () => {
      const connection = await client.connect()
      const sql = 'DELETE FROM users'
      await connection.query(sql)
      const sql2 = 'DELETE FROM orders'
      await connection.query(sql2)
      connection.release()
    })
    
    it('Create method should return a New order', async () => {
      const createdOrder = await orderModel.create({
        status:"active",
        user_id:1
      } as Order)

      expect(createdOrder).toEqual({
        id: createdOrder.id,
        status:"active",
        user_id:1
      } as Order)
    })
    
    it('index method should return All available orders in DB', async () => {
      const orders = await orderModel.index()
      expect(orders.length).toBe(2)
    })
    
    it('completedOrder method should return orders with status="complete', async () => {
      const returnedOrder = await orderModel.completedOrders(user.id as number, "complete")
      expect(returnedOrder.length).toBe(0)

    })
    
    it('currentdOrder method should return orders with status="active', async () => {
      const returnedOrder = await orderModel.currentOrders(user.id as number, "active")
      expect(returnedOrder.length).toBe(1)

    })
    
    it('Delete One method should delete user from DB', async () => {
      const deletedOrder = await orderModel.deleteOrder(order.id as unknown as string)
      expect(deletedOrder.id).toBe(order.id)
    })
  })
})
