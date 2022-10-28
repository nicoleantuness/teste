import { IUserLogin }  from '../../interfaces/users';
import  AppDataSource from '../../data-source';
import { User } from '../../entities/user.entity';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { AppError } from '../../errors/appError';

const userLoginService = async ({email, password} : IUserLogin) => {

    const userRepository = AppDataSource.getRepository(User)


    const account = await userRepository.findOne({
        where: {
            email: email
        }
    })
    if (!account) {
        throw new AppError(403, "Wrong email/password")    }

    if(!bcrypt.compareSync(password, account.password)){
        throw new AppError(403, "Wrong email/password")    } 

    const token = jwt.sign(
        {email: account.email, isAdm: account.isAdm, isActive: account.isActive},
        String(process.env.JWT_SECRET),
        {expiresIn: '1d', subject: account.id}
        
    )
    return token
}

export default userLoginService