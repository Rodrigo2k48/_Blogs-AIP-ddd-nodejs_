import { SequelizeAdapterUser } from '../../../../infrastructure/adapters/sequelize/SequelizeAdapter';
import { UserZod } from '../../../validation/zod/schemas/zodTypes';

export class CreateUser extends SequelizeAdapterUser {
  async execute(userInfos: UserZod): Promise<UserZod | boolean> {
    const { email, password, user_name, image } = userInfos;
    const [sequelizeUser, created] = await this._sequelizeMethods.findOrCreate({
      where: {
        email,
      },
      defaults: {
        email,
        image,
        password,
        user_name,
      },
    });
    if (created) {
      return sequelizeUser.dataValues;
    }
    return created;
  }
}

// const USER_IN_DB_TWO = {
//   email: 'BATMAN@bruce.com',
//   password: 'Martaismylife',
//   user_name: 'Bruce W.',
//   image: 'imagebat.png',
// };

// const a = new CreateUser().execute(USER_IN_DB_TWO);
// a.then((res) => console.log(res));
