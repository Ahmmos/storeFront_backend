import { Product,ProductsModel } from '../../models/products';
import client from '../../database';

const productModel = new ProductsModel();

describe('Product Model', () => {
  describe('Test methods exists', () => {
    it('should have an index method', () => {
      expect(productModel.index).toBeDefined()
    })
    
    it('should have a method show a specific product with id', () => {
      expect(productModel.show).toBeDefined()
    })
    
    it('should have a Create User method', () => {
      expect(productModel.create).toBeDefined()
    })
    
    it('should have method to show products by thier categories', () => {
      expect(productModel.productByCategory).toBeDefined()
    })
    
    it('should have method to show most popular products', () => {
      expect(productModel.mostPopular).toBeDefined()
    })
  })
  
  describe('Test Product Model Logic', () => {
    const product: Product = {
      
      name:"testproduct",
      price: 3,
      category: "dairy"
    } as Product
    
  
    beforeAll(async () => {

      const createdProduct = await productModel.create(product)
      product.id = createdProduct.id
    })
    
    afterAll(async () => {
      const connection = await client.connect()
      const sql = 'DELETE FROM products'
      await connection.query(sql)
      connection.release()
    })
    
    it('Create method should return a New product', async () => {
      const createdProduct = await productModel.create({
        name:"apple",
        price: 25,
        category: "fruit"
      } as Product)
      
      expect(createdProduct).toEqual({
        id: createdProduct.id,
        name:"apple",
        price: 25,
        category: "fruit"
      } as Product)
    })
    
    it('index method should return All available Products in DB', async () => {
      const orders = await productModel.index()
      expect(orders.length).toBe(2)
    })
    
    it('show method should return product when called an id', async () => {
      const returnedProduct = await productModel.show(product.id as number)
      expect(returnedProduct.id).toBe(product.id)
      expect(returnedProduct.name).toBe(product.name)
      expect(returnedProduct.price).toBe(product.price)
      expect(returnedProduct.category).toBe(product.category)
      
    })
    
    it('productByCategory method should return products with specific category', async () => {
      const returnedProduct = await productModel.productByCategory("fruit" as string)
      expect(returnedProduct.length).toBe(1)
      
    })
    
    it('mostPopular method should return top 5 most purchased products ', async () => {
      const returnedProduct = await productModel.mostPopular()
      expect(returnedProduct.length).toBe(1)
      
    })
  })
})
