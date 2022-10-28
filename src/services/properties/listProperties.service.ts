import  AppDataSource  from '../../data-source'
import { Properties } from '../../entities/proprerties.entity'
const listCategorieService = async () => {

    const userRepository = AppDataSource.getRepository(Properties)

    const propertie = userRepository.find()
    
    return propertie
}

export default listCategorieService