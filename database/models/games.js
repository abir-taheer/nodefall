'use strict';
module.exports = (sequelize, DataTypes) => {
	const games = sequelize.define(
		'games',
		{
			locationId: DataTypes.INTEGER,
			roomId: DataTypes.INTEGER,
			isActive: DataTypes.BOOLEAN
		},
		{}
	);
	games.associate = function (models) {
		// associations can be defined here
		games.belongsTo(models.rooms);
		games.belongsTo(models.locations);
		games.hasMany(models.gameroles);
	};
	return games;
};
