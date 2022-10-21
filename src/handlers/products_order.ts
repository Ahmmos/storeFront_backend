import express,{ Request, Response } from 'express'
import {products_orders,Products_OrdersModel} from '../models/products_order';
import verifyAuthToken from "../middlewares/verifyAuthentication";

const productsOrderRoutes = (app: express.Application) => {
    app.get('//orders/:id/products',verifyAuthToken, index)
    app.post('/orders/:id/products', verifyAuthToken, addProducts)
 }


const PO= new Products_OrdersModel;


const index =async (req:Request, res:Response) => {
    try {
        const orders= await PO.allOrders(req.body.id);
        res.json(orders)
    } catch (error) {
        res.status(400)
        .send(`cannot get the products check your connection, ${error}`)
    }
  
};


const addProducts = async (req:Request, res:Response) => {
    const {order_id}= req.body.id
    const {quantity,product_id}=req.body;
 
 if(!quantity || !product_id || !order_id ){
    res.status(400)
    .send( 'Error, missing or uncompleted parameters.');
 };

  try {
      const newProductstoOrder = await  PO.addProduct(quantity,product_id,order_id);
      res.json(newProductstoOrder);
  } catch (error) {
      res.status(400)
      .send(`cannot create these products`)
  };
};



export default productsOrderRoutes;