import { Request, Response } from 'express'
import { AppError, handleError } from "../../errors/appError";
import listCategorieService from '../../services/categories/listCategories.service';

const listCategoriesController = async (req: Request, res: Response) => {

    try {
        const category = await listCategorieService()
        return res.send(category)
        
    } catch (err) {

        if( err instanceof AppError){
            handleError(err, res)
          }
    }
}

export default listCategoriesController