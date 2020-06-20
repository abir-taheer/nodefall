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
	};
	return Players;
};
