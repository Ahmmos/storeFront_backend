import express,{ NextFunction, Request, Response } from 'express'
import {Products_OrdersModel} from '../models/products_order';
import verifyAuthToken from "../middlewares/verifyAuthentication";




const PO= new Products_OrdersModel;





const addProducts = async (req:Request, res:Response , next: NextFunction) => {
    const order_id= Number(req.params.id)
    const quantity= Number(req.body.quantity)
    const product_id= Number(req.body.product_id)
    
    if(!quantity || !product_id || !order_id ){
        res.status(400)
        .send( 'Error, missing or uncompleted parameters.');
    };
    
    try {
        const newProductstoOrder = await  PO.addProduct(quantity,order_id,product_id);
        res.json(newProductstoOrder);
    } catch (error) {
        next(error)
    };
};

const productsOrderRoutes = (app: express.Application) => {
    app.post('/orders/:id/products', verifyAuthToken, addProducts)
}

export default productsOrderRoutes;