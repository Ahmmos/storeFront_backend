import client from '../database' 

export type products_orders = {
    id?:string;
    quantity: number;
    product_id: string;
    order_id: string;
}


export class Products_OrdersModel {

    async allOrders(id: number): Promise<products_orders[]> {
        try {
            const sql = 'SELECT * FROM orders INNER JOIN order_products ON order_id=($id)';
            const conn = await client.connect();
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        } catch (error) {
            throw new Error(
                `Failed to get the order_products with the following error: ${error}`
            );
        };
    };


    async addProduct(quantity: number, orderId: string, productId: string): Promise<products_orders> {
        try {
          const ordersql = 'SELECT * FROM orders WHERE id=($2)'
          const conn = await client.connect()
    
          const result = await conn.query(ordersql, [orderId])
    
          const order = result.rows[0]
    
          if (order.status == "complete") {
            throw new Error(`Could not add product ${productId} to order ${orderId} because order status is ${order.status}`)
          }
    
          conn.release()
        } catch (err) {
          throw new Error(`${err}`)
        }
    
        try {
          const sql = 'INSERT INTO order_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *'
          //@ts-ignore
          const conn = await Client.connect()
    
          const result = await conn.query(sql, [quantity, orderId, productId])
    
          const order = result.rows[0]
    
          conn.release()
    
          return order
        } catch (err) {
          throw new Error(`Could not add product ${productId} to order ${orderId}: ${err}`)
        }
      }
    

};


export default Products_OrdersModel;