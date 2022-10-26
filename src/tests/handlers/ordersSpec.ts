import supertest from 'supertest';
import app from '../../index';
import { JwtPayload, verify } from 'jsonwebtoken';
import { Order } from '../../models/orders';

const request = supertest(app);

describe('Testing Endpoint: /orders', () => {
    const order: Order = {
        status:"Active",
        user_id:1
    };
    let token: string;
    let userId: string;

    it('Testing the create endpoint', async () => {
        await request
          .post('/orders')
          .send(order)
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
            .get('/orders')
            .expect(200);
        });
  
        it('Testing the CompletedOrders endpoint with valid user ID', async () => {
          await request
            .get(`/orders/${userId}`)
            .expect(200);
        });

        it('Testing the delete endpoint ', async () => {
            await request
              .get(`/orders/${userId}`)
              .expect(200);
          });
});
