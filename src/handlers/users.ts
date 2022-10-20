import express,{ Request, Response } from 'express'
import {User,UserModel} from '../models/users';
import jwt from 'jsonwebtoken';
import verifyAuthToken from '../middlewares/verifyAuthentication';

const userRoutes = (app: express.Application) => {
   app.get('/users', verifyAuthToken, index)
   app.get('/users/{:id}', verifyAuthToken,show)
   app.post('/users', createNew)
   app.delete('/users/{:id}',destroy)
   app.post('/users/authenticate', authenticate)
};

const secretToken = process.env.TOKEN_SECRET as string;
const users = new UserModel();

const index = async (_req: Request, res: Response) => {

 try {
   const allUsers = await users.index();
   res.json(allUsers);
  } catch (error) {
   res.status(400)
   .send(`cannot reach users, ${error}`)
}

  
  };
  
  const show = async (req: Request, res: Response) => {

   try { const specificUser = await users.show(req.body.id);
      res.json(specificUser);
      
   } catch (error) {
      res.status(400)
      .send(`cannot reach this user, ${error}`)
   }
    
  };

const createNew = async (req:Request, res: Response)=>{
   
   const {userName,firstName,lastName,password}=req.body;
   const user:User ={userName,firstName,lastName,password};
   
   if(!userName || !firstName || !lastName || !password){
      res.status(400)
      .send( 'Error, missing or uncompleted parameters. userName, firstName,lastName, password required');
   };

   try {
      const newUser= await users.create(user);
      const token = jwt.sign({ user: newUser }, secretToken);
      res.send(token);
   } catch (error) {
      res.status(400)
      res.json(error)
   };
  
};

const destroy = async (req: Request, res: Response) => {
   try {
      
     const authorizationHeader = req.headers.authorization
     if(authorizationHeader){
      const token = authorizationHeader.split(' ')[1]
      jwt.verify(token, secretToken)
     }
 } catch(err) {
     res.status(401)
     res.json('Access denied, invalid token')
     return
 };
     const deleted = await users.delete(req.body.id)
     res.json(deleted)
 };

const authenticate= async (req:Request, res:Response) => {
   const {userName,password}=req.body;
   try {
      const u = await users.authenticate(userName,password);
      if(u){
         const token= jwt.sign({ user: u }, secretToken);
         res.json(token);
      }

   } catch (error) {
      res.status(401)
      res.json(error)
   }
};
  
export default userRoutes;