'use strict';
module.exports = (sequelize, DataTypes) => {
	const Roles = sequelize.define(
		'Roles',
		{
			roleID: DataTypes.INTEGER,
			name: DataTypes.STRING,
			locationID: DataTypes.INTEGER
		},
		{}
	);
	Roles.associate = function (models) {
		// associations can be defined here
	};
	return Roles;
};
