import client from '../database' 

export type products_orders = {
  id?:string;
  quantity: number;
  order_id: number;
  product_id: number;
  
}


export class Products_OrdersModel {
  
  
  async addProduct(quantity: number, order_id: number, product_id: number): Promise<products_orders> {
    try {
      const ordersql = 'SELECT * FROM orders WHERE id=($1)'
      const conn = await client.connect()
      const result = await conn.query(ordersql, [order_id])
      const order = result.rows[0]
      
      if (order.status === "complete") {
        throw new Error(`Could not add product ${product_id} to order ${order_id} because order status is ${order.status}`)
      }
      conn.release()
    } catch (err) {
      throw new Error(`${err}`)
    }
    
    try {
      const sql = 'INSERT INTO order_products (quantity, order_id, product_id) VALUES ($1, $2, $3) RETURNING *'
      const conn = await client.connect()
      const result = await conn.query(sql, [quantity, order_id, product_id])
      const order = result.rows[0]
      conn.release()
      return order
    } catch (err) {
      throw new Error(`Could not add product ${product_id} to order ${order_id}: ${err}`)
    }
  }
  
  
};


export default Products_OrdersModel;