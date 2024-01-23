import { InferAttributes, InferCreationAttributes, DataTypes, Model } from 'sequelize';
import sequelize from './index';
import { SequelizeCategorie } from './Categorie';
import { SequelizeBlogPost } from './Blog-Post';

export class SequelizePostCategory extends Model<InferAttributes<SequelizePostCategory>, InferCreationAttributes<SequelizePostCategory>> {
  declare categoryId: number;
  declare postId: number;
}

SequelizePostCategory.init(
  {
    categoryId: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      field: 'category_id',
    },
    postId: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      field: 'post_id',
    },
  },
  {
    sequelize,
    timestamps: false,
    tableName: 'post_categories',
  }
);

SequelizeCategorie.belongsToMany(SequelizeBlogPost, {
  as: 'blog_posts',
  through: 'post_categories',
  foreignKey: 'category_id',
  otherKey: 'post_id',
});
SequelizeBlogPost.belongsToMany(SequelizeCategorie, {
  as: 'categories',
  through: 'post_categories',
  foreignKey: 'post_id',
  otherKey: 'category_id',
});
