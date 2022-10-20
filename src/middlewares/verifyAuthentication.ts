import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

const verifyAuthToken = (req: Request, res: Response, next:NextFunction) => {
    try {
        const authorizationHeader = req.headers.authorization
        if(authorizationHeader){
            const token = authorizationHeader.split(' ')[1]
            const decoded = jwt.verify(token, process.env.TOKEN_SECRET as string)
        if (decoded) {
        next()
        }else {
         throw new Error('cannot login Please Try Again')
              };
        };
    } catch (error) {
        res.status(401)
        throw new Error('cannot login, Please Try Again')
    };
};
export default verifyAuthToken;