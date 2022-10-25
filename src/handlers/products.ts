import express, { Request, Response } from 'express'
import {Product,ProductsModel} from '../models/products';
import verifyAuthToken from '../middlewares/verifyAuthentication';



const products = new ProductsModel();


const index =async (_req:Request, res:Response) => {
    try {
        const AllProducts= await products.index();
        res.json(AllProducts)
    } catch (error) {
        res.status(400)
        .send(`cannot get the products check your connection, ${error}`)
    }
  
};



const show = async (req:Request, res:Response) => {
    
    const id = Number (req.params.id);
    try {
        const singleProduct = await  products.show(id);
        res.json(singleProduct);
    } catch (error) {
        res.status(400)
        .send(`cannot get this product`)
    };
};




const create = async (req:Request, res:Response) => {
    
      const {name,price,category}=req.body;
   
   if(!name || !price || !category ){
      res.status(400)
      .send( 'Error, missing or uncompleted parameters. name, price,category required');
   };
    const product:Product ={name,price,category};

    try {
        const newProduct = await  products.create(product);
        res.json(newProduct);
    } catch (error) {
        res.status(400)
        .send(`cannot create this product ${name}`)
    };
};

const productsRoutes = (app: express.Application) => {
    app.get('/products',verifyAuthToken, index)
    app.get('/products/:id', show)
    app.post('/products', verifyAuthToken, create)
 }
  export default productsRoutes;