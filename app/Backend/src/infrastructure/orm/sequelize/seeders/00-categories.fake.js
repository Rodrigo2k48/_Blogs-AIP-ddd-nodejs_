module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('categories', [
      {
        id: 1,
        category_name: 'SuperHero',
      },
      {
        id: 2,
        category_name: 'Cars',
      },
      {
        id: 3,
        category_name: 'Sport',
      },
    ]);
  },
};
