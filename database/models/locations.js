'use strict';
module.exports = (sequelize, DataTypes) => {
	const locations = sequelize.define(
		'locations',
		{
			name: DataTypes.STRING
		},
		{}
	);
	locations.associate = function (models) {
		// associations can be defined here
		locations.hasMany(models.roles);
		locations.hasMany(models.games);
	};
	return locations;
};
