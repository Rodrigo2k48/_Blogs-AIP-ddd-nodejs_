import { DataTypes, Model, InferAttributes, InferCreationAttributes, ForeignKey } from 'sequelize';
import sequelize from './index';
import { SequelizeUser } from './User';

export class SequelizeBlogPost extends Model<InferAttributes<SequelizeBlogPost>, InferCreationAttributes<SequelizeBlogPost>> {
  declare id: number | null;
  declare titlePost: string;
  declare contentPost: string;
  declare user_id: ForeignKey<SequelizeUser['id']>;
  declare createdAt: Date | null;
  declare updatedAt: Date | null;
  declare deletedAt: Date | null;
}

SequelizeBlogPost.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    titlePost: {
      field: 'title_post',
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    contentPost: {
      field: 'content_post',
      type: DataTypes.STRING(450),
      allowNull: false,
    },
    createdAt: {
      field: 'created_at',
      type: DataTypes.DATE,
    },
    updatedAt: {
      field: 'updated_at',
      type: DataTypes.DATE,
    },
    deletedAt: {
      field: 'deleted_at',
      type: DataTypes.DATE,
    },
  },
  {
    timestamps: true,
    paranoid: true,
    sequelize,
    tableName: 'blog_posts',
  }
);
// a user has many posts
SequelizeUser.hasMany(SequelizeBlogPost, {
  foreignKey: 'user_id',
  as: 'user_posts',
});
// each post belongs to a single user
SequelizeBlogPost.belongsTo(SequelizeUser, {
  foreignKey: 'user_id',
  as: 'author_post',
});
