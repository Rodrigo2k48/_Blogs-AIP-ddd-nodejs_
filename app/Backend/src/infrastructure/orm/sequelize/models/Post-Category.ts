import { InferAttributes, InferCreationAttributes, DataTypes, Model, ForeignKey } from 'sequelize';
import sequelize from './index';
import { SequelizeCategorie } from './Categorie';
import { SequelizeBlogPost } from './Blog-Post';

export class SequelizePostCategory extends Model<InferAttributes<SequelizePostCategory>, InferCreationAttributes<SequelizePostCategory>> {
  declare category_id: ForeignKey<SequelizeCategorie['id']>;
  declare post_id: ForeignKey<SequelizeBlogPost['id']>;
}

SequelizePostCategory.init(
  {
    category_id: DataTypes.INTEGER.UNSIGNED,
    post_id: DataTypes.INTEGER.UNSIGNED,
  },
  {
    sequelize,
    tableName: 'post_categories',
  }
);


SequelizeCategorie.belongsToMany(SequelizeBlogPost, {
  as: 'categories',
  through: 'post_categories'
});
SequelizeBlogPost.belongsToMany(SequelizeCategorie, {
  as: 'posts',
  through: 'post_categories'
});
