import AppDataSource from '../../data-source';
import { IScheduleRequest } from '../../interfaces/schedules/index'
import { Schedules_users_properties } from '../../entities/schedules_users_properties.entity';
import { Properties } from '../../entities/proprerties.entity';
import { AppError } from '../../errors/appError';

const createSchedulesService = async ({  propertyId, date, hour } : IScheduleRequest) => {
    const propertyRepository = AppDataSource.getRepository(Properties)

    const scheduleRepository = AppDataSource.getRepository(Schedules_users_properties)

    const property = await propertyRepository.findOneBy({
        id: propertyId
    })

    if(!property){
        throw new AppError(404, "Property not found")
    }

    const dateAndHourAlreadyExists = await scheduleRepository.findOne({
        where:{
            date,
            hour
        }
    })
        
    if(dateAndHourAlreadyExists) {
        throw new AppError(409, "Unavailable time");    
    }
    
    const schedule = new Schedules_users_properties()
    schedule.date = date

    const newSchedule = propertyRepository.create(schedule)
    
    await propertyRepository.save(newSchedule)

    return newSchedule
}

export default createSchedulesService