import { DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import sequelize from './index';

export class SequelizeCategorie extends Model<InferAttributes<SequelizeCategorie>, InferCreationAttributes<SequelizeCategorie>> {
  declare id?: number;
  declare categoryName: string;
}
SequelizeCategorie.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    categoryName: {
      field: 'category_name',
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    tableName: 'categories',
  }
);
