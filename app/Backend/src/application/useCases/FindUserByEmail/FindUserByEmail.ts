import { User } from '../../../domain/entities/User/User';
import { SequelizeAdapterUser } from '../../../infrastructure/adapters/sequelize/SequelizeAdapter';

export class FindUserByEmail extends SequelizeAdapterUser {

  async execute(userEmail: string): Promise<User | boolean> {
    const hasUser = await this._sequelizeMethods.findOne({
      where: {
        email: userEmail
      }
    });
    if(!hasUser){
      return false;
    }
    const {email, id, image, password, user_name} = hasUser.dataValues;
    return new User(email, password, user_name, image, id as number);
  }
} 
// const a = new FindUserByEmail().execute('AnaLuizaSantos');
// a.then((res) => console.log(res));


