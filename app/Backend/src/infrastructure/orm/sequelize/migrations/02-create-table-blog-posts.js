'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('blog_posts', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      titlePost: {
        type: Sequelize.STRING(200),
        field: 'title_post',
        allowNull: false,
      },
      contentPost: {
        type: Sequelize.STRING(450),
        field: 'content_post',
        allowNull: false,
      },
      userId: {
        type: Sequelize.INTEGER,
        field: 'user_id',
        references: {
          model: 'users',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        primaryKey: true,
      },
      createdAt: {
        defaltValue: new Date(),
        type: Sequelize.DATE,
        field: 'created_at',
        allowNull: false,
      },
      updatedAt: {
        defaltValue: new Date(),
        type: Sequelize.DATE,
        field: 'updated_at',
        allowNull: false,
      },
      deletedAt: {
        type: Sequelize.DATE,
        field: 'deleted_at',
        allowNull: true,
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('blog_posts');
  },
};
