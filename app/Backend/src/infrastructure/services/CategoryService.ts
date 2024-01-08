import { CreateCategory } from '../../application/useCases/CategoriesCases/CreateCategory/CreateCategory';
import { GetAllCategories } from '../../application/useCases/CategoriesCases/GetAllCategories/GetAllCategories';
import { CategoriesInterface } from '../../domain/entities/Categories/Categories';
import Conflict from '../../domain/error/typeErros/Conflict';
import { CategoryRepository } from '../../domain/repository/CategoryRepository';

export class CategoryService implements CategoryRepository {
  protected create: CreateCategory;
  protected getAll: GetAllCategories;

  constructor(create: CreateCategory, getAll: GetAllCategories) {
    this.create = create;
    this.getAll = getAll;
  }
  async createCategory(category: string): Promise<CategoriesInterface | boolean> {
    const newCategory = await this.create.execute(category);
    if (!newCategory) {
      throw new Conflict('Category already exists');
    }
    return newCategory;
  }

  async getAllCategories(): Promise<CategoriesInterface[]> {
    const allCategories = await this.getAll.execute();
    return allCategories;
  }
}
