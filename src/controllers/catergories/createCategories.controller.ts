import { Request, Response } from 'express'
import { AppError, handleError } from "../../errors/appError";
import createCategorieService from '../../services/categories/createCategorie.services';

const createCategorieController = async (req: Request, res: Response) => {

    try {
        const { name } = req.body
        const newUser = await createCategorieService({name})
        return res.status(201).send(newUser)
    } catch (err) {

        if (err instanceof AppError) {

            handleError(err, res)
        }
    }
}

export default createCategorieController