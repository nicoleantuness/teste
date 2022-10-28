import AppDataSource from '../../data-source';
import { Properties } from '../../entities/proprerties.entity';
import { Addresses } from '../../entities/addresses.entity';
import { Categories } from '../../entities/categories.entity';
import {  IPropertyRequest } from '../../interfaces/properties';
import { AppError } from '../../errors/appError';

const createPropertiesService = async ( newProperty : IPropertyRequest)=> {
    const propertiesRepository = AppDataSource.getRepository(Properties)
    const adressesRepository = AppDataSource.getRepository(Addresses)
    const categoryRepository = AppDataSource.getTreeRepository(Categories)

    console.log(newProperty)
    const getCategories = await categoryRepository.findOneBy({
        id: newProperty.categoryId
    })

    if(!getCategories) {
        throw new AppError(404, 'Category not found')
    }

    if (newProperty.address.state.length > 2) {
        throw new AppError(400, "State can only have 2 digits");    

    }

    if(newProperty.address.zipCode.length > 8) {
        throw new AppError(400, "ZipCode can only have 8 or less digits");    
    }

    const findProperty = await adressesRepository.findOne({
        where: {    
            zipCode: newProperty.address.zipCode
        }
    })

    if(findProperty) {
        throw new AppError(400, "Property already exists");  
    }

    const newAddress = await adressesRepository.save(newProperty.address)

    const propertie = new Properties()
    
    propertie.value = newProperty.value
    propertie.size = newProperty.size
    propertie.category = getCategories
    propertie.address = newAddress
    
    propertiesRepository.create(propertie)
    
    await propertiesRepository.save(propertie)

    return propertie
}

export default createPropertiesService