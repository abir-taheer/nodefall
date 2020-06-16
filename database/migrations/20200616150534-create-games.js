'use strict';
module.exports = {
  up : (queryInterface, Sequelize) => {
    return queryInterface.createTable('Games', {
      id : {
        allowNull : false,
        autoIncrement : true,
        primaryKey : true,
        type : Sequelize.INTEGER
      },
      name : {type : Sequelize.STRING},
      publicID : {type : Sequelize.STRING},
      locationID : {type : Sequelize.INTEGER},
      createdAt : {allowNull : false, type : Sequelize.DATE},
      updatedAt : {allowNull : false, type : Sequelize.DATE}
    });
  },
  down : (queryInterface,
          Sequelize) => { return queryInterface.dropTable('Games'); }
};
