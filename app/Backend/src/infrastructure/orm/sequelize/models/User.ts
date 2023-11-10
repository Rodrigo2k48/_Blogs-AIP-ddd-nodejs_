import { DataTypes, Model, InferAttributes, InferCreationAttributes } from 'sequelize';
import sequelize from './index';

export class SequelizeUser extends Model<InferAttributes<SequelizeUser>, InferCreationAttributes<SequelizeUser>> {
  declare id: number | null;
  declare user_name: string;
  declare email: string;
  declare password: string;
  declare image: string;
}

SequelizeUser.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    tableName: 'users',
  }
);
