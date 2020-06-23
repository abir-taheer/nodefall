'use strict';
module.exports = (sequelize, DataTypes) => {
	const GameRoles = sequelize.define(
		'GameRoles',
		{
			gameId: DataTypes.INTEGER,
			playerId: DataTypes.INTEGER,
			roleId: DataTypes.INTEGER
		},
		{}
	);
	GameRoles.associate = function (models) {
		// associations can be defined here
		GameRoles.belongsTo(models.Games);
		GameRoles.belongsTo(models.Players);
		GameRoles.belongsTo(models.Roles);
	};
	return GameRoles;
};
