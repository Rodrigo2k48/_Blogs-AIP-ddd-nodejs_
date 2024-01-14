import { UserInterface } from '../../../../domain/entities/User/User';
import { SequelizeAdapterUser } from '../../../../infrastructure/adapters/sequelize/SequelizeAdapter';

export class FindUserByEmail extends SequelizeAdapterUser {
  async execute(userEmail: string): Promise<UserInterface | boolean> {
    const hasUser = await this._sequelizeMethods.findOne({
      where: {
        email: userEmail,
      },
    });
    if (hasUser) {
      return hasUser.dataValues;
    }
    return false;
  }
}
