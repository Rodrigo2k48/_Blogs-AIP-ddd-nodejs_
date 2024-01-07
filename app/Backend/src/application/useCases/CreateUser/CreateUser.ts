import { UserInterface } from '../../../domain/entities/User/User';
import { SequelizeAdapterUser } from '../../../infrastructure/adapters/sequelize/SequelizeAdapter';

export class CreateUser extends SequelizeAdapterUser {
  async execute(userInfos: UserInterface): Promise<UserInterface | boolean> {
    const { email, password, userName, image } = userInfos;
    const [sequelizeUser, created] = await this._sequelizeMethods.findOrCreate({
      where: {
        email,
      },
      defaults: {
        email,
        image,
        password,
        userName,
      },
    });
    if (created) {
      return sequelizeUser.dataValues;
    }
    return created;
  }
}
