import { Request, Response } from 'express'
import { AppError, handleError } from "../../errors/appError";
import listCategorieService from '../../services/categories/listCategories.service';

const listPropertiesController = async (req: Request, res: Response) => {

    try {
        const propertie = await listCategorieService()
        return res.send(propertie)
        
    } catch (err) {

        if( err instanceof AppError){
            handleError(err, res)
          }
    }
}

export default listPropertiesController