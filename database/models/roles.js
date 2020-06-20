'use strict';
module.exports = (sequelize, DataTypes) => {
	const Roles = sequelize.define(
		'Roles',
		{
			name: DataTypes.STRING,
			locationID: DataTypes.INTEGER
		},
		{}
	);
	Roles.associate = function (models) {
		// associations can be defined here
		Roles.belongsTo(models.Locations);
		Roles.hasMany(models.GameRoles);
	};
	return Roles;
};
