'use strict';
module.exports = (sequelize, DataTypes) => {
	const gameroles = sequelize.define(
		'gameroles',
		{
			gameId: DataTypes.INTEGER,
			playerId: DataTypes.INTEGER,
			roleId: DataTypes.INTEGER
		},
		{}
	);
	gameroles.associate = function (models) {
		// associations can be defined here
		gameroles.belongsTo(models.games);
		gameroles.belongsTo(models.players);
		gameroles.belongsTo(models.roles);
	};
	return gameroles;
};
