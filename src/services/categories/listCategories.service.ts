import  AppDataSource  from '../../data-source'
import { Categories } from '../../entities/categories.entity';

const listCategorieService = async () => {

    const userRepository = AppDataSource.getRepository(Categories)

    const category = userRepository.find()
    
    return category
}

export default listCategorieService