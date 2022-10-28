import AppDataSource from "../../data-source";
import { Categories } from "../../entities/categories.entity";
import { ICategoryRequest } from "../../interfaces/categories/index";
import { AppError } from "../../errors/appError";

const createCategorieService = async ({ name }: ICategoryRequest) => {
  const userRepository = AppDataSource.getRepository(Categories);

  const categorie = await userRepository.find();

  const nameAlreadyExists = categorie.find(
    (category) => category.name === name
  );

  if (nameAlreadyExists) {
    throw new AppError(400, "Name already exists");
  }

  const category = new Categories();
  category.name = name;

  const newCategory = userRepository.create(category);

  await userRepository.save(newCategory);

  return newCategory;
};

export default createCategorieService;
