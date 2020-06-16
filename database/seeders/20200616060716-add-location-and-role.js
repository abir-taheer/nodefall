'use strict';
const now = new Date();
module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert("Locations", [{
      locationId: 10,
      name: "High School",
      createdAt: now,
      updatedAt: now,
    }]).then(() => {
      return queryInterface.bulkInsert("Roles", [{
        roleId: 100,
        name: "Janitor",
        LocID: 10,
        createdAt: now,
        updatedAt: now,
      }])
    })
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */

    return queryInterface.bulkDelete("Location", null, {})
        .then(() =>
        {
          return queryInterface.bulkDelete("Roles", null, {})
      })

  }
};
