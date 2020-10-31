'use strict';

const products = [
  { name: 'Xiaomi Mi 9X', price: 3600000 },
  { name: 'Xiaomi Mi 9', price: 6200000 },
  { name: 'Xiaomi Redmi Note 7', price: 2200000 },
  { name: 'Xiaomi Redmi X', price: 2000000 },
  { name: 'Xiaomi Redmi 7A', price: 1200000 },
].map(product => {
  product.createdAt = new Date();
  product.updatedAt = new Date();
  return product
})


module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('products', products, {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
