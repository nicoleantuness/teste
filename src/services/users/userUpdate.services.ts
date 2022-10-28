import { IUserUpdate } from "../../interfaces/users";
import AppDataSource from "../../data-source";
import bcrypt from "bcrypt";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/appError";

const userUpdateService = async (
  body: IUserUpdate,
  paramsId: string,
  userId: string,
  isAdm: boolean
) => {
  console.log(paramsId);
  if (!isAdm && paramsId !== userId) {
    throw new Error("Unatherized");
  }

  const userRepository = AppDataSource.getRepository(User);

  const account = await userRepository.findOne({
    where: {
      id: userId,
    },
  });

  if (!account) {
    throw new AppError(409, "Account not exists");
  }

  await userRepository.update(userId, body);

  return body;
};

export default userUpdateService;
