import express, { Request, Response , NextFunction} from 'express'
import {Product,ProductsModel} from '../models/products';
import verifyAuthToken from '../middlewares/verifyAuthentication';



const products = new ProductsModel();


const index =async (_req:Request, res:Response , next: NextFunction) => {
    try {
        const AllProducts= await products.index();
        res.json(AllProducts)
    } catch (error) {
        next(error)
    }
    
};



const show = async (req:Request, res:Response , next: NextFunction) => {
    
    const id = Number (req.params.id);
    try {
        const singleProduct = await  products.show(id);
        res.json(singleProduct);
    } catch (error) {
        next(error)
    };
};




const create = async (req:Request, res:Response , next: NextFunction) => {
    
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
        next(error)
    };
};

const productByCategory = async (req:Request, res:Response , next: NextFunction) => {
    const category = req.params.category;
    try {
        const SameproductsType = await  products.productByCategory(category);
        res.json(SameproductsType);
    } catch (error) {
        next(error)
    };
};

const mostPopular = async (_req:Request, res:Response , next: NextFunction) => {
    try {
        const topfive = await  products.mostPopular();
        res.json(topfive);
    } catch (error) {
        next(error)
    };
};

const productsRoutes = (app: express.Application) => {
    app.get('/products',verifyAuthToken, index)
    app.get('/products/:id', show)
    app.post('/products', verifyAuthToken, create)
    app.get('/products/cat/:category', productByCategory)
    app.get('/products/top/top5', mostPopular)
}

export default productsRoutes;