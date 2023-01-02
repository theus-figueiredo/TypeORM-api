import { AppDataSource } from "../database/data-source";
import { ServiceCategory } from "../database/entity/ServiceCategorie";

const categorieRepository = AppDataSource.getMongoRepository(ServiceCategory);

class CategoryService {

  public async store(category: string): Promise<ServiceCategory> {
    const newCategory = new ServiceCategory();
    newCategory.category = category;

    await categorieRepository.save(newCategory);
    return newCategory;
  };


  public async readAll(): Promise<ServiceCategory[]> {
    const allCategories = await categorieRepository.find();
    return allCategories;
  };


  public async readById(id: number): Promise<ServiceCategory | null> {
    const category = await categorieRepository.findOneBy({ id });
    if(!category) return null;

    return category;
  };


  public async update(id: number, updatedCategory: string): Promise<ServiceCategory | null> {
    const category = await categorieRepository.findOneBy({ id });
    if(!category) return null

    category.category = updatedCategory;
    await categorieRepository.save(category);

    return category;
  };


  public async delete(id: number): Promise<Boolean> {
    const category = await categorieRepository.findOneBy({ id });
    if(!category) return false;

    await categorieRepository.delete({ id });
    return true;
  }
};

export default new CategoryService();