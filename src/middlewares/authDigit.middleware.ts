import {Request, Response, NextFunction} from "express";
import { AppError } from '../errors/appError';


export const authDigit = (req: Request, res: Response, next: NextFunction) => {
    try{
        const { address } = req.body
        
        if (address.state.length > 2) {
            throw new AppError(409, "State can only have 2 digits");    
    
        }
    
        if(address.zipCode.length > 8) {
            throw new AppError(409, "ZipCode can only have 8 or less digits");    
        }

        next()
    } catch(error) {
        return res.status(401).json({message: "Invalid request"})

    }
   
}