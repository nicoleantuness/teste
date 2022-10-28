import { Router } from "express";
import createCategorieController from "../controllers/catergories/createCategories.controller";
import listCategoriesController from "../controllers/catergories/listCategories.controller";
import createPropertiesController from "../controllers/properties/createProperties.controller";
import listPropertiesController from "../controllers/properties/listProperties.controller";

const routes = Router();

import userCreateController from "../controllers/users/userCreate.controller";
import userDeleteController from "../controllers/users/userDelete.controllers";
import userListController from "../controllers/users/userList.controller";
import userLoginController from "../controllers/users/userLogin.controller";
import userUpdateController from "../controllers/users/userUpdate.controller";

import { authAdm } from "../middlewares/authAdm.middleware";
import { authDigit } from "../middlewares/authDigit.middleware";
import { authUser } from "../middlewares/authUser.middleware";

routes.post("/users", userCreateController);
routes.get("/users", authUser, authAdm, userListController);
routes.post("/login", userLoginController);
routes.patch("/users/:idParams", authUser, authAdm, userUpdateController);
routes.delete("/users/:idParams", userDeleteController);

routes.post("/categories", authUser, authAdm, createCategorieController);
routes.get("/categories", listCategoriesController);

routes.post("/properties", authUser, authAdm, createPropertiesController);
routes.get("/properties", listPropertiesController);

export default routes;
