import { Request, Response } from 'express'
import { AppError, handleError } from "../../errors/appError";
import { IScheduleRequest } from '../../interfaces/schedules';
import createSchedulesService from '../../services/schedules/createSchedules.service';

const createSchedulesController = async (req: Request, res: Response) => {
    
    try {
        const { propertyId, date, hour }: IScheduleRequest = req.body

        const newSchedule = await createSchedulesService({  propertyId, date, hour })
        return res.status(201).send(newSchedule)
    } catch (err) {

        if (err instanceof AppError) {
            handleError(err, res)
        }
    }
}

export default createSchedulesController