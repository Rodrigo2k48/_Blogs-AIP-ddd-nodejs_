import { ModelStatic } from 'sequelize';
import { SequelizeUser } from '../../orm/sequelize/models/User';

export abstract class SequelizeAdapterUser {
  protected _sequelizeMethods: ModelStatic<SequelizeUser> = SequelizeUser;
}