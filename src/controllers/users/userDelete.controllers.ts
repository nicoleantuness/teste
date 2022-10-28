import { Request, Response } from "express";
import userDeleteService from "../../services/users/userDelete.service";

const userDeleteController = async (req: Request, res: Response) => {
  const idParams = req.params.id;

  await userDeleteService(idParams);

  return res.status(204).json({ message: "User deleted with sucess!" });
};

export default userDeleteController;
