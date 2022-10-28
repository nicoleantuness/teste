import { Request, Response } from "express";
import userUpdateService from "../../services/users/userUpdate.services";
import { AppError, handleError } from "../../errors/appError";
import { instanceToPlain } from "class-transformer";

const userUpdateController = async (req: Request, res: Response) => {
  const body = req.body;
  const { idParams } = req.params;
  const { id, isAdm } = req.user;
  const user = await userUpdateService(body, idParams, id, isAdm);

  return res
    .status(201)
    .json({ message: "User updated!", ...instanceToPlain(user) });
};

export default userUpdateController;
