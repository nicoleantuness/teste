import {Request, Response, NextFunction} from "express";
import { AppError } from '../errors/appError';


export const authAdm = async (req: Request, res: Response, next: NextFunction) => {

        const { isAdm } = req.user

        if(!isAdm) {
            throw new AppError(403, "This route can only be accessed by the administrator")
        }
        next()
}