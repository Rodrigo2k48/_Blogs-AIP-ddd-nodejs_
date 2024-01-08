import { CategoriesInterface } from '../../../../domain/entities/Categories/Categories';
import { SequelizeAdapterCategory } from '../../../../infrastructure/adapters/sequelize/SequelizeAdapter';

export class CreateCategory extends SequelizeAdapterCategory {
  async execute(categoryName: string): Promise<CategoriesInterface | boolean> {
    const [sequelizeCategory, created] = await this._sequelizeMethods.findOrCreate({
      where: {
        categoryName,
      },
      defaults: {
        categoryName,
      },
    });
    if (created) {
      return sequelizeCategory.dataValues as unknown as CategoriesInterface;
    }
    return created;
  }
}
