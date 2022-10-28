import { Request, Response } from 'express'
import userCreateService from '../../services/users/userCreate.service'
import { AppError, handleError } from "../../errors/appError";
import { instanceToPlain } from 'class-transformer';

const userCreateController = async (req: Request, res: Response) => {
    try {
        const { name, email, password, isAdm, isActive, createdAt, updatedAt, id } = req.body
        const newUser = await userCreateService({name, email, password, isAdm, isActive, createdAt, updatedAt, id})
    
        return res.status(201).send(instanceToPlain(newUser))
    } catch (err) {

        if (err instanceof AppError) {

            handleError(err, res)
        }
    }
}

export default userCreateController