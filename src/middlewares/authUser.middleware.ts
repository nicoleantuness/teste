import {Request, Response, NextFunction} from "express";
import jwt from "jsonwebtoken"
import { AppError } from "../errors/appError";
    
export const authUser = (req: Request, res: Response, next: NextFunction) => {
      const token = req.headers.authorization?.split(" ")[1]

      
    if(!token) {
        throw new AppError(401, 'Invalid token')
      }
       jwt.verify(
          String(token), 
          String(process.env.JWT_SECRET),
          (err: any, decoded: any) => {
            
            if(err) {
              throw new AppError(401, 'Invalid token')
            }
          req.user = {
            id: decoded.sub,
            userEmail: decoded.email,
            isAdm: decoded.isAdm,
            isActive: decoded.isActive

          }
          
          next()
        })


}