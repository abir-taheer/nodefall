'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
        'Roles', // name of Source model
        'LocID', // name of the key we're adding
        {
          type: Sequelize.INTEGER,
          references: {
            model: 'Locations', // name of Target model
            key: 'locationID', // key in Target model that we're referencing
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        }
    ).then(() => {
      return queryInterface.removeColumn(
          'Roles',
          'locationID',
      )
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
        'Roles', // name of Source model
        'LocID' // key we want to remove
    );
  }
};
