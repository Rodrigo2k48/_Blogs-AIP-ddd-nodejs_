'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('categories', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      categoryName: {
        type: Sequelize.STRING,
        field: 'category_name',
        allowNull: false
      }
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('categories');
  }
};