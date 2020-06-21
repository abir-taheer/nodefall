'use strict';
module.exports = (sequelize, DataTypes) => {
	const Games = sequelize.define(
		'Games',
		{
			locationID: DataTypes.INTEGER,
			roomID: DataTypes.INTEGER,
			isActive: DataTypes.BOOLEAN
		},
		{}
	);
	Games.associate = function (models) {
		// associations can be defined here
		Games.belongsTo(models.Rooms);
		Games.belongsTo(models.Locations);
		Games.hasMany(models.GameRoles);
	};
	return Games;
};
