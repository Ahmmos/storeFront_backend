import supertest from 'supertest';
import app from '../../index';
import { JwtPayload, verify } from 'jsonwebtoken';
import { User } from '../../models/users';

const request = supertest(app);

describe('Testing Endpoint: /users', () => {
    const user: User = {
        userName:"Ahmos",
        firstName: "Ahmed",
        lastName: "Mostafa",
        password: "ahmos123"
    };
    let token: string;
    let userId: string;

    it('Testing the create endpoint', async () => {
      await request
        .post('/users')
        .send(user)
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

    it('Testing the index endpoint with valid token', async () => {
        await request
          .get('/users')
          .set('Authorization', `Bearer ${token}`)
          .expect(200);
      });

      it('Testing the read endpoint with valid token and valid user ID', async () => {
        await request
          .get(`/users/${userId}`)
          .set('Authorization', `Bearer ${token}`)
          .expect(200);
      });

    it('Testing the authorization endpoint with valid user', async () => {
        await request.post('/user/login').send(user).expect(200);
      });

    it('Testing the delete endpoint with valid token and valid user ID', async () => {
        await request
          .delete('/users')
          .set('Authorization', `Bearer ${token}`)
          .send({ id: userId })
          .expect(200);
      });


});