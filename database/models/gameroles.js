'use strict';
module.exports = (sequelize, DataTypes) => {
  const GameRoles = sequelize.define('GameRoles', {
    gameID: DataTypes.INTEGER,
    playerID: DataTypes.INTEGER,
    roleID: DataTypes.INTEGER
  }, {});
  GameRoles.associate = function(models) {
    // associations can be defined here
  };
  return GameRoles;
};