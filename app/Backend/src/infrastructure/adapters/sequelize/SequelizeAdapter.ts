import { ModelStatic } from 'sequelize';
import { SequelizeUser } from '../../orm/sequelize/models/User';
import { SequelizeCategorie } from '../../orm/sequelize/models/Categorie';

export abstract class SequelizeAdapterUser {
  protected _sequelizeMethods: ModelStatic<SequelizeUser> = SequelizeUser;
}

export abstract class SequelizeAdapterCategory {
  protected _sequelizeMethods: ModelStatic<SequelizeCategorie> = SequelizeCategorie;
}
