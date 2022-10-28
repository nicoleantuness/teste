import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/appError";
const userDeleteService = async (id: string) => {
  const userRepository = AppDataSource.getRepository(User);
  const account = await userRepository.findOneBy({
    id,
  });

  if (!account) {
    throw new AppError(404, "Account not exists");
  }

  if (!account.isActive) {
    throw new AppError(400, "User is already deleted");
  }

  await userRepository.update(id, { isActive: false });
  return;
};

export default userDeleteService;
