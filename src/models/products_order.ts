import client from '../database' 

export type products_orders = {
    id?:string;
    quantity: number;
    product_id: string;
    order_id: string;
}


export class Products_OrdersModel {

    async index(): Promise<products_orders[]> {
        try {
            const sql = 'SELECT * FROM order_products';
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


    async addProducts(PO:products_orders): Promise<products_orders> {

        try {
            const conn = await client.connect();
            const sql = 'INSERT INTO order_products (quantity, product_id,order_id) VALUES($1, $2,$3) RETURNING *';
            const result = await conn.query(sql, [PO.quantity, PO.product_id,PO.order_id]);
            const Order = result.rows[0];
            conn.release();
            return Order;
        } catch (err) {
            throw new Error(`Could not create order of many products, Error: ${(err as Error).message}`)
        };
    };



};


export default Products_OrdersModel;