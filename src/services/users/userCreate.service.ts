import AppDataSource from '../../data-source';
import { User } from '../../entities/user.entity';
import { IUser } from '../../interfaces/users';
import bcrypt from 'bcrypt'
import { AppError } from '../../errors/appError';

const userCreateService = async ({ name, email, password, isAdm, id } : IUser) => {
    const userRepository = AppDataSource.getRepository(User)

    const users = await userRepository.find()

    const emailAlreadyExists = users.find(user => user.email === email)
    
    if(emailAlreadyExists) {
        throw new AppError(400, "Email already exists");    }

    const user = new User()
    user.name = name
    user.email = email
    user.password = bcrypt.hashSync(password,10)
    user.isAdm = isAdm

    const newUser = userRepository.create(user)
    
    await userRepository.save(newUser)

    const { password: pwd, ...rest } = newUser

    return rest
}

export default userCreateService