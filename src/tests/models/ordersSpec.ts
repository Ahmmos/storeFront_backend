import { Order,OrderModel } from '../../models/orders';

const orderModel = new OrderModel();
const baseorder: Order = {

    status:"Active",
    user_id:1
};
let order: Order;

describe('Testing: Orders Model', () => {

  it('Must have a create method', () => {
    expect(orderModel.create).toBeDefined();
  });

  it('Testing the createtion', async () => {
    order = await orderModel.create(baseorder);
    expect({ status: order.status, user_id: order.user_id}).toEqual({
      status: baseorder.status,
      user_id: baseorder.user_id 
    });
  });
  
  it('Must have an index method', () => {
    expect(orderModel.index).toBeDefined();
  });


  it('Must have a CompletedOrders method', () => {
    expect(orderModel.CompletedOrders).toBeDefined();
  });

  it('Must have a delete method', () => {
    expect(orderModel.deleteOrder).toBeDefined();
  });
 
});