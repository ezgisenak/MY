'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example: */
      await queryInterface.bulkInsert('user', [{
        user_name: 'user1',
        email:'user1@test.com'
      },{
        user_name: 'user2',
        email:"user2@test.com"
      },
      {
        user_name: 'user3',
        email:"user3@test.com"
      }], {});


      await queryInterface.bulkInsert('product', [{
        product_name: 'product1',
        product_count: 5
      },{
        product_name: 'product2',
        product_count: 10
      },
      {
        product_name: 'product3',
        product_count: 20
      },
      {
        product_name: 'product4',
        product_count: 8
      }], {});
    

      await queryInterface.bulkInsert('order', [{
        order_name: 'order1',
        user_id: 1,
        product_id: 1
      },{
        order_name: 'order2',
        user_id: 2,
        product_id: 2
      },
      {
        order_name: 'order3',
        user_id: 3,
        product_id: 3
      },
      {
        order_name: 'order4',
        user_id: 3,
        product_id: 4
      }], {});



  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:*/
    await queryInterface.bulkDelete('Users', null, {});
     
  }
};
