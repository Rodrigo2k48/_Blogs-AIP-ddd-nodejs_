import { DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import sequelize from './index';

export class SequelizeCategorie extends Model<InferAttributes<SequelizeCategorie>, InferCreationAttributes<SequelizeCategorie>> {
  declare id: number | null;
  declare category_name: string;
}
SequelizeCategorie.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
  },
  category_name: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  sequelize,
  timestamps: false,
  tableName: 'categories'
});
