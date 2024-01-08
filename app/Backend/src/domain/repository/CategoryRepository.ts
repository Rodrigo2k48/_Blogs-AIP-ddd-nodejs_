/* eslint-disable no-unused-vars */
import { CategoriesInterface } from '../entities/Categories/Categories';

export interface CategoryRepository {
  createCategory(category: string): Promise<CategoriesInterface | boolean>;
  getAllCategories(): Promise<CategoriesInterface[]>;
}
