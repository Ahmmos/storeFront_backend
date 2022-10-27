import express,{ Request, Response, NextFunction } from 'express'
import {Order,OrderModel} from "../models/orders";
import verifyAuthToken from "../middlewares/verifyAuthentication";


const index =async (_req:Request, res:Response , next:NextFunction) => {
    try {
        const Allorders= await orders.index();
        res.json(Allorders)
    } catch (error) {
        next(error)
    }
    
};

const orders = new OrderModel;

const create = async (req:Request, res:Response , next :NextFunction ) => {
    
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
        next(error)
    };
};


const completedOrder = async (req:Request, res:Response , next :NextFunction) => {
    try {
        const finishedOrder = await orders.completedOrders(Number(req.user?.id), "complete");
        if(!finishedOrder.length){
            res.send("all your orders are active orders and there is no completed orders")
        }else{
            res.json(finishedOrder);
        }
        
    } catch (error) {
        next(error)
    };
};


const currentOrders = async (req:Request, res:Response , next :NextFunction) => {
    
    
    try {
        const availbleOrders = await orders.currentOrders(Number(req.user?.id), "active");
        if(!availbleOrders.length){
            res.send("there is no active orders for you right now")
        }else {
            res.json(availbleOrders);
        }
        
    } catch (error) {
        next(error)
    };
};


const destroy = async (req:Request, res:Response , next : NextFunction) => {
    
    const id =req.params.id;
    try {
        const deletedOrder = await  orders.deleteOrder(id);
        res.json(deletedOrder);
    } catch (error) {
        next(error)
    };
};

const ordersRoutes = (app: express.Application) => {
    app.get('/orders', verifyAuthToken, index)
    app.get('/orders/status/complete',verifyAuthToken, completedOrder)
    app.get('/orders/status/active',verifyAuthToken, currentOrders)
    app.post('/orders', verifyAuthToken, create)
    app.delete('/orders', verifyAuthToken ,destroy)
}


export default ordersRoutes;