'use strict';
module.exports = (sequelize, DataTypes) => {
	const Players = sequelize.define(
		'Players',
		{
			name: DataTypes.STRING,
			roomId: DataTypes.INTEGER,
			isOwner: DataTypes.BOOLEAN,
			isActive: DataTypes.BOOLEAN
		},
		{}
	);
	Players.associate = function (models) {
		// associations can be defined here
		Players.belongsTo(models.Rooms);
		Players.hasMany(models.GameRoles, { foreignKey: 'roomId' });
	};
	return Players;
};
