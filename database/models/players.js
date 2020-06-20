'use strict';
module.exports = (sequelize, DataTypes) => {
	const Players = sequelize.define(
		'Players',
		{
			name: DataTypes.STRING,
			roomID: DataTypes.INTEGER,
			isOwner: DataTypes.BOOLEAN,
			isActive: DataTypes.BOOLEAN
		},
		{}
	);
	Players.associate = function (models) {
		// associations can be defined here
		Players.belongsTo(models.Rooms);
		Players.hasMany(models.GameRoles);
	};
	return Players;
};
