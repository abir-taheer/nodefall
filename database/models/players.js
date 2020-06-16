'use strict';
module.exports = (sequelize, DataTypes) => {
  const Players = sequelize.define('Players', {
    gameID : DataTypes.INTEGER,
    name : DataTypes.STRING,
    isOwner : DataTypes.BOOLEAN,
    roleID : DataTypes.INTEGER
  },
                                   {});
  Players.associate = function(models) {
    // associations can be defined here
  };
  return Players;
};
