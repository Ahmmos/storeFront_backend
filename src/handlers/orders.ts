import express,{ Request, Response, NextFunction } from 'express'
import {Order,OrderModel} from "../models/orders";
import verifyAuthToken from "../middlewares/verifyAuthentication";



const ordersRoutes = (app: express.Application) => {
    app.get('/orders', index)
    app.get('/orders/completedOrder',verifyAuthToken, completedOrder)
    app.post('/orders', verifyAuthToken, create)
    app.delete('/orders', verifyAuthToken ,destroy)
 }

 const index =async (_req:Request, res:Response) => {
    try {
        const Allorders= await orders.index();
        res.json(Allorders)
    } catch (error) {
        res.status(400)
        .send(`cannot get the orders check your connection, ${error}`)
    }
  
};
 
const orders = new OrderModel;

const create = async (req:Request, res:Response) => {
    
    const {status,user_id}=req.body;
 
 if(!status|| !user_id ){
    res.status(400)
    .send( 'Error, missing or uncompleted parameters.');
 };
  const order:Order ={status,user_id};

  try {
      const newOrder = await orders.create(order);
      res.json(newOrder);
  } catch (error) {
      res.status(400)
      .send(`cannot do this order with this user_id ${user_id}`)
  };
};


const completedOrder = async (req:Request, res:Response) => {
    
    try {
        const finishedOrder = await  orders.CompletedOrders(Number(req.user?.id));
        res.json(finishedOrder);
    } catch (error) {
        res.status(400)
        .send(`cannot get completed order`)
    };
};



const destroy = async (req:Request, res:Response) => {
    
    const id =req.params.id;
    try {
        const deletedOrder = await  orders.deleteOrder(id);
        res.json(deletedOrder);
    } catch (error) {
        res.status(400)
        .send(`cannot delete this order maybe you are not authrized`)
    };
};


export default ordersRoutes;