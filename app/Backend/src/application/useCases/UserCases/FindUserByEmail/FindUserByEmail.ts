import { UserInterface } from '../../../../domain/entities/User/User';
import { SequelizeAdapterUser } from '../../../../infrastructure/adapters/sequelize/SequelizeAdapter';

export class FindUserByEmail extends SequelizeAdapterUser {
  async execute(userEmail: string): Promise<UserInterface | null> {
    const hasUser = await this._sequelizeMethods.findOne({
      where: {
        email: userEmail,
      },
    });
    if (!hasUser) {
      return null;
    } else {
      const { email, id, image, password, userName } = hasUser.dataValues;
      const userInDb = { email, id, image, password, userName };
      return userInDb;
    }
  }
}
