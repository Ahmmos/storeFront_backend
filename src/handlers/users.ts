import express,{ NextFunction, Request, Response } from 'express'
import {User,UserModel} from '../models/users';
import jwt from 'jsonwebtoken';
import verifyAuthToken from '../middlewares/verifyAuthentication';



const secretToken = process.env.TOKEN_SECRET as string;
const users = new UserModel();


const index = async (_req: Request, res: Response , next: NextFunction) => {
   
   try {
      const allUsers = await users.index();
      res.json(allUsers);
   } catch (error) {
      next(error)
   }
   
   
};

const show = async (req: Request, res: Response, next: NextFunction) => {
   
   try {
      const intId = Number(req.params.id)
      const specificUser = await users.show(intId)
      res.status(200)
      .json(specificUser)
   } catch (error) {
      next(error)
   }
   
};

const createNew = async (req:Request, res: Response, next: NextFunction)=>{
   
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
      next(error)
   };
   
};

const destroy = async (req: Request, res: Response, next: NextFunction) => {
   try {
      const id = Number (req.params.id) 
      const deleted = await users.delete(id)
      res.json(deleted)
   } catch (error) {
      next(error)
   };
};


const update =async (req:Request, res: Response, next: NextFunction)=>{
   
   try {
      
      const { id, userName,firstName,lastName,password } = req.body;
      if (!userName || !firstName || !password || !lastName) {
         return res
         .status(400)
         .send(
            'Error, missing or malformed parameters. userName,firstName,lastName,password required'
            );
         }
         const user:User ={id,userName,firstName,lastName,password};
         const updatedUser= await users.update(user);
         res.json({
            status: 'success',
            data: updatedUser,
            message: 'User updated successfully',
         });
      } catch (error) {
         next(error)
      };
      
   };
   
   
   
   const authenticate= async (req:Request, res:Response , next: NextFunction) => {
      const {userName,password}=req.body;
      try {
         const u = await users.authenticate(userName,password);
         if(u){
            const token= jwt.sign({ user: u }, secretToken);
            res.json(token);
         }
         
      } catch (error) {
         next(error)
      }
   };
   
   
   const userRoutes = (app: express.Application) => {
      app.get('/users', verifyAuthToken, index)
      app.get('/users/:id',verifyAuthToken, show)
      app.post('/users', createNew)
      app.delete('/users/:id',verifyAuthToken,destroy)
      app.put('/users', verifyAuthToken, update)
      app.post('/users/authenticate', authenticate)
   };
   
   export default userRoutes;