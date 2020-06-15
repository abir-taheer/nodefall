'use strict';
module.exports = (sequelize, DataTypes) => {
	const Locations = sequelize.define(
		'Locations',
		{
			locationID: DataTypes.INTEGER,
			name: DataTypes.STRING
		},
		{}
	);
	Locations.associate = function (models) {
		// associations can be defined here
	};
	return Locations;
};
