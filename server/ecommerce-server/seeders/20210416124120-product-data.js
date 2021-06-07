'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Products', [{
      name: 'Playstation 5',
      image_url: 'https://d2pa5gi5n2e1an.cloudfront.net/global/images/product/gameconsoles/Sony_Playstation_5_ph/Sony_Playstation_5_ph_L_1.jpg',
      price: 8800000,
      stock: 5,
      CategoryId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'Nintendo Switch',
      image_url: 'https://images-na.ssl-images-amazon.com/images/I/61Mav-nmefL._AC_SX679_.jpg',
      price: 4500000,
      stock: 10,
      CategoryId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'Cyberpunk 2077',
      image_url: 'https://www.dsogaming.com/wp-content/uploads/2020/10/cyberpunk-2077-header.jpg',
      price: 500000,
      stock: 10,
      CategoryId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'Horizon Zero Dawn',
      image_url: 'https://cdn.akamai.steamstatic.com/steam/apps/1151640/capsule_616x353.jpg?t=1617204098',
      price: 350000,
      stock: 10,
      CategoryId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'Oculus Quest 2',
      image_url: 'https://www.okeguys.com/wp-content/uploads/2021/02/Oculus-Quest-2.jpg',
      price: 6500000,
      stock: 3,
      CategoryId: 3,
      createdAt: new Date(),
      updatedAt: new Date()
    }])
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Products', null)
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
