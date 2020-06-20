'use strict';
module.exports = (sequelize, DataTypes) => {
	const Rooms = sequelize.define(
		'Rooms',
		{
			name: DataTypes.STRING,
			publicID: DataTypes.STRING
		},
		{}
	);
	Rooms.associate = function (models) {
		// associations can be defined here
		Rooms.hasMany(models.Players);
		Rooms.hasMany(models.Games);
	};
	return Rooms;
};
