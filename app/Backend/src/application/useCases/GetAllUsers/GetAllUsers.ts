import { FindOptions } from 'sequelize';
import { SequelizeAdapterUser } from '../../../infrastructure/adapters/sequelize/SequelizeAdapter';
import { UserInterface } from '../../../domain/entities/User/User';

export class GetAllUsers extends SequelizeAdapterUser {
  protected options: FindOptions = {
    attributes: ['id', 'email', 'image', 'user_name'],
  };
  async execute(): Promise<Omit<UserInterface, 'password'>[]> {
    const users = await this._sequelizeMethods.findAll(this.options);
    return users.map((user) => user.dataValues);
  }
}
