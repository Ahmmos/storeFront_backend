import supertest from 'supertest';
import app from '../../index';
import { JwtPayload, verify } from 'jsonwebtoken';
import { Product } from '../../models/products';

const request = supertest(app);

describe('Testing Endpoint: /products', () => {
    const product: Product = {
        name:"Apple",
        price: "3",
        category: "fruit"
    };
    let token: string;
    let userId: string;

    it('Testing the create endpoint', async () => {
        await request
          .post('/products')
          .send(product)
          .expect(200)
          .then((res) => {
            token = res.text;
            const decodedJWT = verify(
              token as string,
              process.env.TOKEN_SECRET as string
            ) as JwtPayload;
            userId = decodedJWT.user.userId;
          });
      });
  
      it('Testing the index endpoint ', async () => {
          await request
            .get('/products')
            .expect(200);
        });
  
        it('Testing the show endpoint with valid user ID', async () => {
          await request
            .get(`/products/${userId}`)
            .expect(200);
        });


});