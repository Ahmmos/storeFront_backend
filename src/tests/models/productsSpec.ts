import { Product,ProductsModel } from '../../models/products';

const productModel = new ProductsModel();
const baseProduct: Product = {

    name:"Apple",
    price: 3,
    category: "fruit"
};
let product: Product;

describe('Testing: Products Model', () => {
  it('Must have a create method', () => {
    expect(productModel.create).toBeDefined();
  });

  it('Testing the createtion', async () => {
    product = await productModel.create(baseProduct);
    expect({ name: product.name, price: product.price, category: product.category }).toEqual({
      name: baseProduct.name,
      price: baseProduct.price,
      category: baseProduct.category
    });
  });
  
  it('Must have an index method', () => {
    expect(productModel.index).toBeDefined();
  });


  it('Must have a show method', () => {
    expect(productModel.show).toBeDefined();
  });

 
});