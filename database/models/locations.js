'use strict';
module.exports = (sequelize, DataTypes) => {
	const Locations = sequelize.define(
		'Locations',
		{
			name: DataTypes.STRING
		},
		{}
	);
	Locations.associate = function (models) {
		// associations can be defined here
		Locations.hasMany(models.Roles);
		Locations.hasMany(models.Games);
	};
	return Locations;
};
