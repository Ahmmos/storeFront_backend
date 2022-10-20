import { products_orders,Products_OrdersModel } from '../../models/products_order';

const orderProductsModel = new Products_OrdersModel();
const baseorderProducts: products_orders = {

    quantity:3,
    order_id:"1",
    product_id:"1"

};
let orderProducts: products_orders;

describe('Testing: order_Products Model', () => {

  it('Must have a create method', () => {
    expect(orderProductsModel.addProducts).toBeDefined();
  });

  it('Testing the createtion', async () => {
    orderProducts = await orderProductsModel.addProducts(baseorderProducts);
    expect({ quantity: orderProducts.quantity, order_id: orderProducts.order_id , product_id: orderProducts.product_id}).toEqual({
        quantity: baseorderProducts.quantity,
        order_id: baseorderProducts.order_id ,
        product_id: baseorderProducts.product_id
    });
  });
  
  it('Must have an index method', () => {
    expect(orderProductsModel.index).toBeDefined();
  });

});