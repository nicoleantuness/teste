import { Request, Response } from 'express'
import { AppError, handleError } from "../../errors/appError";
import createPropertiesService from '../../services/properties/createProperties.service';

const createPropertiesController = async (req: Request, res: Response) => {
          
    try {
        //const { value, size, categoryId, address } = req.body
        const newProperty = req.body
        const newPropertie = await createPropertiesService(newProperty)
        return res.status(201).send(newPropertie)
    } catch (err) {

        if (err instanceof AppError) {

            handleError(err, res)
        }
    }
}

export default createPropertiesController