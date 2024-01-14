import { FindOptions } from 'sequelize';
import { UserInterface } from '../../../../domain/entities/User/User';
import { SequelizeAdapterUser } from '../../../../infrastructure/adapters/sequelize/SequelizeAdapter';

export class GetUserById extends SequelizeAdapterUser {
  protected options: FindOptions = {
    attributes: ['id', 'email', 'image', 'user_name'],
  };
  async execute(id: number): Promise<Omit<UserInterface, 'password'> | boolean> {
    const hasUser = await this._sequelizeMethods.findByPk(id, this.options);
    if (hasUser) {
      return hasUser.dataValues;
    }
    return false;
  }
}
