'use strict';
module.exports = (sequelize, DataTypes) => {
	const roles = sequelize.define(
		'roles',
		{
			name: DataTypes.STRING,
			locationId: DataTypes.INTEGER
		},
		{}
	);
	roles.associate = function (models) {
		// associations can be defined here
		roles.belongsTo(models.locations);
		roles.hasMany(models.gameroles);
	};
	return roles;
};
