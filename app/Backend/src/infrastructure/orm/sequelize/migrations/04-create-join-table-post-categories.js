'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('post_categories', {
      categoryId: {
        type: Sequelize.INTEGER,
        field: 'category_id',
        references: {
          model: 'categories',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      postId: {
        type: Sequelize.INTEGER,
        field: 'post_id',
        references: {
          model: 'blog_posts',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('post_categories');
  }
};