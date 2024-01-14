/* eslint-disable no-unused-vars */
import { CategoriesInterface } from '../entities/Categories/Categories';

export interface CategoryRepository {
  newCategory(category: string): Promise<CategoriesInterface | boolean>;
  allCategories(): Promise<CategoriesInterface[]>;
}
