import { User, UserModel } from "./src/models/users";
import {Express} from 'express';


declare global {
    namespace Express {
      interface Request {
        user?: User
      }
    }
  }