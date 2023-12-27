import { SequelizeAdapterUser } from '../../../infrastructure/adapters/sequelize/SequelizeAdapter';
import { UserZod } from '../../validation/zod/schemas/zodTypes';

export class FindUserByEmail extends SequelizeAdapterUser {
  async execute(userEmail: string): Promise<UserZod | null> {
    const hasUser = await this._sequelizeMethods.findOne({
      where: {
        email: userEmail,
      },
    });
    if (!hasUser) {
      return null;
    }
    const { email, id, image, password, user_name } = hasUser.dataValues;
    const userInDb = { email, id, image, password, user_name };
    return userInDb;
  }
}
