import express,{ Request, Response } from 'express'
import {products_orders,Products_OrdersModel} from '../models/products_order';
import verifyAuthToken from "../middlewares/verifyAuthentication";

const productsOrderRoutes = (app: express.Application) => {
    app.get('/orderProducts', index)
    app.post('/orderProducts', verifyAuthToken, create)
 }


const PO= new Products_OrdersModel;


const index =async (_req:Request, res:Response) => {
    try {
        const Products= await PO.index();
        res.json(Products)
    } catch (error) {
        res.status(400)
        .send(`cannot get the products check your connection, ${error}`)
    }
  
};


const create = async (req:Request, res:Response) => {
    
    const {quantity,product_id,order_id}=req.body;
 
 if(!quantity || !product_id || !order_id ){
    res.status(400)
    .send( 'Error, missing or uncompleted parameters.');
 };
  const product:products_orders ={quantity,product_id,order_id};

  try {
      const newProductstoOrder = await  PO.addProducts(product);
      res.json(newProductstoOrder);
  } catch (error) {
      res.status(400)
      .send(`cannot create these products`)
  };
};



export default productsOrderRoutes;