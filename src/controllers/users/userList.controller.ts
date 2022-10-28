import { Request, Response } from 'express'
import userListService from '../../services/users/userList.service'
import { AppError, handleError } from "../../errors/appError";
import { instanceToPlain } from 'class-transformer';

const userListController = async (req: Request, res: Response) => {

    try {
        const users = await userListService()
        return res.send(instanceToPlain(users))
        
    } catch (err) {

        if( err instanceof AppError){
            handleError(err, res)
          }
    }
}

export default userListController