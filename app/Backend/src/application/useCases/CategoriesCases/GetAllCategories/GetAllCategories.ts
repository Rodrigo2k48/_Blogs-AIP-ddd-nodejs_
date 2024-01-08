import { CategoriesInterface } from '../../../../domain/entities/Categories/Categories';
import { SequelizeAdapterCategory } from '../../../../infrastructure/adapters/sequelize/SequelizeAdapter';

export class GetAllCategories extends SequelizeAdapterCategory {
  async execute(): Promise<CategoriesInterface[]> {
    const categories = await this._sequelizeMethods.findAll();
    return categories.map((category) => category.dataValues);
  }
}
